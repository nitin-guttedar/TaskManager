import axios from 'axios';

const API = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
});

export async function loginApi({ email, password }) {
  const res = await API.post('/login', { email, password });
  return res.data;
}

export async function signupApi({ email, password }) {
  const res = await API.post('/register', { email, password });
  return res.data;
}
