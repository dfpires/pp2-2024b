import { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../services/clientService';
import { useNavigate } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getClients().then(response => {
      setClients(response.data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteClient(id);
      setClients(clients.filter((client: any) => client.id !== id));
      alert('Cliente removido com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/clients/update/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Lista de Clientes</h1>
      <ul>
        {clients.map((client: any) => (
          <li key={client.id} className="mb-2 flex justify-between border-b border-gray-300 pb-2">
            <div>
              {client.nome} - {client.cpf}
            </div>
            <div>
              <button
                onClick={() => handleUpdate(client.id)}
                className="bg-blue-500 text-white px-1 py-1 ml-4 mr-2 text-xs"
              >
                Atualizar
              </button>
              <button
                onClick={() => handleDelete(client.id)}
                className="bg-red-500 text-white px-1 py-1 text-xs"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;