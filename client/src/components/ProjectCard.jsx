import { Link } from 'react-router-dom';
import { BsCardText } from 'react-icons/bs';
import { BsMessenger } from 'react-icons/bs';

export default function ProjectCard({ project }) {
  return (
    <>
      <div className="col-md-4">
        <div className="card mb-3 rounded">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">{project.name}</h5>

              <Link className="btn btn-light" to={`/projects/${project.id}`}>
                View
              </Link>
            </div>
            <p className="small">
              <strong>Client: </strong>
              {project.client.name}
            </p>
            {project.description && (
              <Link to={`/projects/${project.id}`}>
                <strong>
                  <BsCardText
                    className="icon"
                    title="This card has a description"
                    aria-label="This card has a description"
                  />
                </strong>
              </Link>
            )}
            <Link
              to={`/projects/${project.id}`}
              style={{ textDecoration: 'none' }}
            >
              <BsMessenger
                className="icon"
                title="This card has a comment"
                aria-label="This card has a comment"
              />
              {/* make dynamic when comments are added. */}2
            </Link>
            <p className="small">
              Status: <strong>{project.status}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
