import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// ✅ Register
export const registerUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/register`, { email, password });
  return res.data;
};

// ✅ Login
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

// ✅ Logout
export const logoutUser = () => {
  localStorage.removeItem('token');
};
