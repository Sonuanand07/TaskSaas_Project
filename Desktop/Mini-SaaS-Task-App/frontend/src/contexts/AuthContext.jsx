import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { apiCall } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const data = await apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Account created');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out');
    navigate('/login');
  };

  const value = { token, user, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

