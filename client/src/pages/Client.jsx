import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import UpdateClientForm from '../components/UpdateClientForm';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '../queries/clientQueries';

export default function Client() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT, { variables: { id } });
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.client.name}</h1>
          <p>{data.client.description}</p>

          <ClientInfo client={data.client} />
          <UpdateClientForm client={data.client} />
        </div>
      )}
    </>
  );
}
