import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { IMaskInput } from 'react-imask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const emailRegex = /^\S+@\S+\.\S+$/;
  const isFormValid =
    name.trim() !== '' && emailRegex.test(email) && phone.trim() !== '';

  const [addClient] = useMutation(ADD_CLIENT, {
    onError(error) {
      if (error.message.includes('E11000 duplicate key error')) {
        return toast.error('A client with that email already exists.');
      } else {
        return toast.error('An error occurred. Please try again.');
      }
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      });
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      return toast.error('Please fill in all fields');
    }

    addClient({ variables: { name, email, phone } })
      .then(() => {
        toast.success('Client added successfully');
      })
      .catch((err) => console.error(err));

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  {/* <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  /> */}
                  <IMaskInput
                    mask="000-000-0000"
                    value={phone}
                    onAccept={(value) => setPhone(value)}
                    className="form-control"
                    id="phone"
                    placeholder="123-456-7890"
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
