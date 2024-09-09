import React, { useState } from 'react';
import { createClient } from '../services/clientService';

const CreateClient = () => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    rg: '',
    cpf: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient(formData);
      alert('Cliente criado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl mb-4">Criar Cliente</h1>
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
        Criar
      </button>
    </form>
  );
};

export default CreateClient;