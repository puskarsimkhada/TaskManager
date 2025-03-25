import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/tasks";

export const getTask = () => axios.get(API_URL);
export const postTask = (tasks) => axios.post(API_URL,tasks);
export const updateTask = (id,task) => axios.put(`${API_URL}/${id}`,task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);