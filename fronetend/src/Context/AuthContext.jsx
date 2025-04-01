
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/check-session')
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [])

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    return axios.post('http://localhost:3001/api/auth/logout')

      .then(response => {
        alert(response.data.message);
        setUser(null);
      })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };