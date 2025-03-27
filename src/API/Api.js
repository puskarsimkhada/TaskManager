import axios from 'axios';

export let API_URL = "http://127.0.0.1:8000";
// const API = axios.create({API_URL}, { withCredentials: true });

export const getTask = () => axios.get(`${API_URL}/api/tasks`);
export const postTask = (tasks) => axios.post(`${API_URL}/api/tasks`,tasks);
export const updateTask = (id,task) => axios.put(`${API_URL}/api/tasks/${id}`,task);
export const deleteTask = (id) => axios.delete(`${API_URL}/api/tasks/${id}`);