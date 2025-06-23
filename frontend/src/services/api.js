import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Columns
export const fetchColumns = () => axios.get(`${API_URL}/columns`);
export const createColumn = (data, config) =>
  axios.post(`${API_URL}/columns`, data, config);
export const updateColumn = (id, data, config) =>
  axios.put(`${API_URL}/columns/${id}`, data, config);
export const deleteColumn = (id, config) =>
  axios.delete(`${API_URL}/columns/${id}`, config);

// Tasks
export const fetchTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (data, config) =>
  axios.post(`${API_URL}/tasks`, data, config);
export const updateTask = (id, data, config) =>
  axios.put(`${API_URL}/tasks/${id}`, data, config);
export const deleteTask = (id, config) =>
  axios.delete(`${API_URL}/tasks/${id}`, config);

// Users
export const registerUser = (data) =>
  axios.post(`${API_URL}/users/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/users/login`, data);
export const getCurrentUser = (token) =>
  axios.get(`${API_URL}/users/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
