import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/clientService';

const Login = ({ setUser }: { setUser: (username: string) => void }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Chama a função authenticateUser para verificar as credenciais
      const user = await authenticateUser(formData.username, formData.password);
      if (user) {
        // Se o usuário for encontrado, faz login
        setUser(user.username);
        navigate('/clients'); // Redireciona para a página de clientes
      } else {
        // Se não for encontrado, exibe mensagem de erro
        setError('Nome de usuário ou senha inválidos.');
      }
    } catch (error) {
      setError('Erro ao conectar à API.');
    }
    }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;