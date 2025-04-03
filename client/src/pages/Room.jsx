import React, { useEffect, useState } from 'react';
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useThreads } from '@liveblocks/react';
import { Composer, Thread } from '@liveblocks/react-ui';

function RoomContent() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`http://localhost:8000/api/clerk-users`);
        if (!res.ok) {
          throw new Error('Error fetching users');
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        setErrorUsers(error);
        toast.error('Failed to fetch users');
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  // useThreads is now safely inside a RoomProvider
  const { threads } = useThreads();

  if (loadingUsers) return <div>Loading users...</div>;
  if (errorUsers) return <div>Error loading users: {errorUsers.message}</div>;

  return (
    <ClientSideSuspense fallback={<div>Room loading...</div>}>
      {threads &&
        threads.map((thread) => <Thread key={thread.id} thread={thread} />)}
      <Composer />
    </ClientSideSuspense>
  );
}

export function Room() {
  const params = useParams();

  return (
    <RoomProvider id={params.id}>
      <RoomContent />
    </RoomProvider>
  );
}
