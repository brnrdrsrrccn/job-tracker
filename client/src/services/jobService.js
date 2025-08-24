import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs'; // Backend endpoint

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// ✅ Add interceptor to attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ CRUD operations
export const getJobs = async () => {
  const response = await api.get('/');
  return response.data;
};

export const addJob = async (jobData) => {
  const response = await api.post('/', jobData);
  return response.data;
};

export const updateJob = async (id, updatedData) => {
  const response = await api.put(`/${id}`, updatedData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;
