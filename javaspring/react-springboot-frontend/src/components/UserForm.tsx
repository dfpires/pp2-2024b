import React, { useState, useEffect } from 'react';
import { createUser, getUsers } from '../services/userService';

export const UserForm = () => {
  const [user, setUser] = useState({
    email: '',
    nome: '',
    senha: '',
    telefone: '',
    dataAniversario: '',
  });

  const [users, setUsers] = useState<any[]>([]); // Estado para armazenar os usuários cadastrados

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data); // Atualiza o estado com os usuários recebidos da API
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Carregar os usuários quando o componente for montado
  useEffect(() => {
    fetchUsers(); // Carrega os usuários ao montar o componente
  }, []);

  // Função para criar um novo usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Converter a data de string para Date
      const formattedUser = {
        ...user,
        data_aniversario: new Date(user.dataAniversario), // Converte a data para um objeto Date
      };

      await createUser(formattedUser);
      alert('Usuário criado com sucesso!');
      fetchUsers(); // Atualiza a lista de usuários após a criação
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="password"
          placeholder="Senha"
          value={user.senha}
          onChange={(e) => setUser({ ...user, senha: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={user.telefone}
          onChange={(e) => setUser({ ...user, telefone: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="date"
          placeholder="Data de Nascimento"
          value={user.dataAniversario}
          onChange={(e) => setUser({ ...user, dataAniversario: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Criar Usuário
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Usuários Cadastrados</h2>
      
      {/* Tabela para exibir os dados dos usuários */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Telefone</th>
            <th className="border border-gray-300 p-2">Data de Aniversário</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.nome}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.telefone}</td>
              <td className="border border-gray-300 p-2">{user.dataAniversario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
