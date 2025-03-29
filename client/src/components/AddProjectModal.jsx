import { useState, useRef } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('new');

  // Create a ref to the modal element.
  const modalRef = useRef(null);

  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      });
    }
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  // Check if the form is valid. You can add more validation as needed.
  // name, description, status and client are required fields
  const isFormValid =
    name.trim() !== '' &&
    description.trim() !== '' &&
    status.trim() !== '' &&
    client.trim() !== '';

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Execute the mutation with the necessary variables.
      await addProject({ variables: { name, description, client, status } });
      toast.success('Project added successfully');

      // Reset the form fields.
      setName('');
      setDescription('');
      setStatus('new');
      setClient('');

      // Programmatically close the modal on success.
      // Ensure you're using Bootstrap 5.
      const modalElement = modalRef.current;
      if (modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        } else {
          // If no instance exists, create one and then hide it.
          new window.bootstrap.Modal(modalElement).hide();
        }
      }
    } catch (err) {
      // On error, the toast error is already shown and the modal remains open.
      console.error(err);
    }
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        ref={modalRef}
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                New Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select
                    id="client"
                    className="form-select"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove data-bs-dismiss from the submit button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
