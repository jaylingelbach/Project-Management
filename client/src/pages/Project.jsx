import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { Room } from '../pages/Room';
import { ClientSideSuspense } from '@liveblocks/react';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  // toggle for edit project form
  const [showEditForm, setShowEditForm] = useState(false);

  // on click of update project button, toggle edit project form
  const handleUpdateClick = () => {
    setShowEditForm((prev) => !prev);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow rounded">
              <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                <h3 className="mb-0">{data.project.name}</h3>
                <Link to="/" className="btn btn-light btn-sm">
                  Back
                </Link>
              </div>
              <div className="card-body">
                <h5 className="text-muted">Description</h5>
                <p>{data.project.description}</p>
                <hr />
                <div className="mb-3">
                  <h5>Project Status</h5>
                  <span className="badge bg-info">{data.project.status}</span>
                </div>
                <ClientInfo client={data.project.client} />
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleUpdateClick}
                  >
                    {showEditForm ? 'Cancel' : 'Update Project'}
                  </button>
                  <DeleteProjectButton projectId={data.project.id} />
                </div>
                {showEditForm && (
                  <div className="mt-4">
                    <div className="card">
                      <div className="card-body">
                        <h4>Edit Project</h4>
                        <p>Update project details below:</p>
                        <EditProjectForm
                          project={data.project}
                          setShowEditForm={setShowEditForm}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <ClientSideSuspense>
                <Room />
              </ClientSideSuspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
