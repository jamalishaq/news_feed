import axios from 'axios';

// Base URL pulled from environment (Vite env) or default to http://localhost:3000
// This ensures requests go to the backend running on localhost:3000 during development.
const baseURL = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
