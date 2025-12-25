import axios from 'axios';

export const loginApi = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:4000/auth/login', {
    email,
    password
  });
  return response.data; // מחזיר { token, user }
};