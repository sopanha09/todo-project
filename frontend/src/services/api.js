import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Columns
export const getColumns = (token) =>
  axios.get(`${API_URL}/columns`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createColumn = (data, token) =>
  axios.post(`${API_URL}/columns`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateColumn = (id, data, token) =>
  axios.put(`${API_URL}/columns/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteColumn = (id, token) =>
  axios.delete(`${API_URL}/columns/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Tasks
export const getTasks = (token) =>
  axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = (data, token) =>
  axios.post(`${API_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = (id, data, token) =>
  axios.put(`${API_URL}/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (id, token) =>
  axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Users
export const registerUser = (data) =>
  axios.post(`${API_URL}/users/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/users/login`, data);
export const getCurrentUser = (token) =>
  axios.get(`${API_URL}/users/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
