import { useEffect } from 'react';
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'react-router-dom';
import { useUsers } from '../queries/userQueries';
import { toast } from 'react-toastify';
import { useThreads } from '@liveblocks/react';
import { Composer, Thread } from '@liveblocks/react-ui';

export function Room() {
  const params = useParams();
  const { users, loading, error } = useUsers(params.id);
  const { threads } = useThreads();
  useEffect(() => {
    if (loading) {
      toast.info('Loading users...');
    }
    if (users) {
      toast.success('Users loaded successfully');
    }
    if (error) {
      toast.error('Failed to fetch users');
    }
  }, [error]);

  // Example auth function in Room.jsx (or wherever you set authEndpoint)
  const getRoom = async () => {
    try {
      const endpoint = 'http://localhost:8080/api/liveblocks-auth';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies so Clerk can validate the session
        body: JSON.stringify({ room: params.id })
      });
      return await response.json();
    } catch (error) {
      toast.error('Failed to fetch room');
    }
  };

  return (
    <RoomProvider id={params.id}>
      <ClientSideSuspense fallback={<div>Room loading...</div>}>
        {threads.map((thread) => (
          <Thread key={thread.id} thread={thread} />
        ))}
        <Composer />
      </ClientSideSuspense>
    </RoomProvider>
  );
}
