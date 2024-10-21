import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const createUser = async (user: any) => {
    console.log(user)
  return await axios.post(API_URL, user);
};

export const loginUser = async (email: string, senha: string) => {
  return await axios.post(`${API_URL}/login`, { email, senha });
};