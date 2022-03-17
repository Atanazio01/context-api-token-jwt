import React, { useState, useEffect, useContext } from 'react';


import api from '../api';
import { Context } from '../Context/AuthContext';

import history from '../../history';

export default function Users() {
  const { handleLogout } = useContext(Context);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users');
      
      if (data.error === 'expired jwt') {
        localStorage.removeItem('token');
        history.push('/login');
        return;
      }
      setUsers(data);
    })();
  }, [users]);
  
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.website})</li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}
