import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IMaskInput } from 'react-imask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GET_CLIENT } from '../queries/clientQueries';
import { UPDATE_CLIENT } from '../mutations/clientMutations';

export default function UpdateClientForm({ client }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const emailRegex = /^\S+@\S+\.\S+$/;

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, name, email, phone },
    update(cache, { data: { updateClient } }) {
      cache.writeQuery({
        query: GET_CLIENT,
        variables: { id: client.id },
        data: { client: updateClient }
      });
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      toast.error('Please fill in all fields');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }

    try {
      updateClient(name, email, phone);
      toast.success('Client updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the client');
    }

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="mt-5">
      <h3>Update Client Details</h3>
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
          <IMaskInput
            mask="000-000-0000"
            value={phone}
            onAccept={(value) => setPhone(value)}
            className="form-control"
            id="phone"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
