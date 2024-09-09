import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClients, updateClient } from '../services/clientService';

const UpdateClient = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    rg: '',
    cpf: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await getClients(); // Ajuste a lógica de obter um cliente específico
        const client = response.data.find((client: any) => client.id === id);
        if (client) {
          setFormData(client);
        }
      } catch (error) {
        console.error('Erro ao carregar cliente:', error);
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClient(id!, formData);
      alert('Cliente atualizado com sucesso!');
      navigate('/clients');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl mb-4">Atualizar Cliente</h1>
      <input
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        className="border border-gray-300 p-2 w-full"
      />
      <input
        name="endereco"
        placeholder="Endereço"
        value={formData.endereco}
        onChange={handleChange}
        className="border border-gray-300 p-2 w-full"
      />
      <input
        name="rg"
        placeholder="RG"
        value={formData.rg}
        onChange={handleChange}
        className="border border-gray-300 p-2 w-full"
      />
      <input
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
        className="border border-gray-300 p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Atualizar
      </button>
    </form>
  );
};

export default UpdateClient;