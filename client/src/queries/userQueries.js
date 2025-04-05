// import { useState, useEffect } from 'react';

// export function useUsers() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchUsers() {
//             try {
//                 const response = await fetch(`/api/clerk-users?orgId=${orgId}`);
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (err) {
//                 console.error('Error fetching users:', err);
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         if (orgId) fetchUsers();
//     }, [orgId]);

//     return { users, loading, error };
// }