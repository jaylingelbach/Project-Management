import { useQuery } from '@apollo/client';

import ClientRow from './ClientRow';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error </p>;
  console.log(data);
  return (
    <>
      {!loading && !error && (
        <div>
          <h1 className="display-4">Clients</h1>
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
