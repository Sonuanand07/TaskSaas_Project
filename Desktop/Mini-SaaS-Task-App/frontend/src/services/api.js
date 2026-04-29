const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API error');
  }

  return data;
};

