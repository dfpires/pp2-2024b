import axios from 'axios';

const API_URL = 'http://localhost:3001/clients'; // Substitua pela sua API

export const getClients = () => axios.get(API_URL);
export const createClient = (client: any) => axios.post(API_URL, client);
export const updateClient = (id: string, client: any) => axios.put(`${API_URL}/${id}`, client);
export const deleteClient = (id: string) => axios.delete(`${API_URL}/${id}`);

// Função para autenticação de usuário
export const authenticateUser = async (username: string, password: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/users`);
      const users = response.data;
  
      // Verifica se o usuário e senha correspondem a algum usuário na API
      const user = users.find(
        (u: any) => u.username === username && u.password === password
      );
  
      if (user) {
        return user; // Retorna o usuário autenticado
      } else {
        return null; // Retorna null se o usuário não for encontrado
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      throw new Error('Erro ao conectar à API');
    }
  };