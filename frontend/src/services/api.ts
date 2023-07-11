// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/', // replace with your API base URL
});

export const sendPrompt = async (prompt: string) => {
  const response = await api.post('/prompt', { prompt });
  return response.data;
};