import React, { useState, useEffect } from 'react';
import { createOrder, getOrders } from '../services/orderService';
import { getUsers } from '../services/userService';
import { getProducts } from '../services/productService';

interface OrderItem {
  idProduto: number;
  qtde: number;
  preco: number;
}

interface Order {
  idUsuario: number;
  status: string;
  data: string; // Formato 'YYYY-MM-DD'
  itens: OrderItem[];
}

export const OrderForm: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    idUsuario: 0,
    status: '',
    data: '',
    itens: [{ idProduto: 0, qtde: 1, preco: 0 }],
  });

  const [users, setUsers] = useState<any[]>([]); // Estado para armazenar os usuários
  const [products, setProducts] = useState<any[]>([]); // Estado para armazenar os produtos
  const [orders, setOrders] = useState<any[]>([]); // Estado para armazenar os pedidos

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para buscar pedidos
  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Carregar usuários, produtos e pedidos ao montar o componente
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  // Função para adicionar um novo item ao pedido
  const addItemToOrder = () => {
    setOrder({
      ...order,
      itens: [...order.itens, { idProduto: 0, qtde: 1, preco: 0 }],
    });
  };

  // Função para atualizar os detalhes de um item específico
  const updateItem = (index: number, field: string, value: any) => {
    const updatedItens = order.itens.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setOrder({ ...order, itens: updatedItens });
  };

  // Função para criar um novo pedido
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedOrder = {
        idUsuario: order.idUsuario,
        status: order.status,
        data: order.data, // Mantém a data no formato 'YYYY-MM-DD'
        itens: order.itens.map((item) => ({
          idProduto: item.idProduto, // Envia apenas o ID do produto
          qtde: item.qtde,
          preco: item.preco,
        })),
      };

      await createOrder(formattedOrder);
      alert('Pedido criado com sucesso!');
      setOrder({
        idUsuario: 0,
        status: '',
        data: '',
        itens: [{ idProduto: 0, qtde: 1, preco: 0 }],
      });
      fetchOrders();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  return (
    <div>
      {/* Formulário para criar pedidos */}
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Seleção de Usuário */}
        <select
          value={order.idUsuario}
          onChange={(e) => setOrder({ ...order, idUsuario: parseInt(e.target.value) })}
          className="block mb-2 p-2 border"
        >
          <option value={0}>Selecione o Usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nome}
            </option>
          ))}
        </select>

        {/* Status e Data */}
        <input
          type="text"
          placeholder="Status"
          value={order.status}
          onChange={(e) => setOrder({ ...order, status: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="date"
          placeholder="Data"
          value={order.data}
          onChange={(e) => setOrder({ ...order, data: e.target.value })}
          className="block mb-2 p-2 border"
        />

        {/* Itens do Pedido */}
        <h3 className="font-bold mt-4">Itens do Pedido</h3>
        {order.itens.map((item, index) => (
          <div key={index} className="border p-2 mb-2">
            <select
              value={item.idProduto}
              onChange={(e) => updateItem(index, 'idProduto', parseInt(e.target.value))}
              className="block mb-2 p-2 border"
            >
              <option value={0}>Selecione o Produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nome}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantidade"
              value={item.qtde}
              onChange={(e) => updateItem(index, 'qtde', parseInt(e.target.value))}
              className="block mb-2 p-2 border"
            />
            <input
              type="number"
              placeholder="Preço"
              value={item.preco}
              onChange={(e) => updateItem(index, 'preco', parseFloat(e.target.value))}
              className="block mb-2 p-2 border"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItemToOrder}
          className="bg-green-500 text-white p-2 mb-4"
        >
          Adicionar Item
        </button>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Criar Pedido
        </button>
      </form>

      {/* Lista de Pedidos */}
      <h2 className="text-xl font-bold mb-4">Pedidos Cadastrados</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Usuário</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Data</th>
            <th className="border border-gray-300 p-2">Itens do Pedido</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.usuario?.nome}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2">
                {new Date(order.data).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Produto</th>
                      <th className="border border-gray-300 p-2">Quantidade</th>
                      <th className="border border-gray-300 p-2">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.itens.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-300 p-2">{item.produto?.nome}</td>
                        <td className="border border-gray-300 p-2">{item.qtde}</td>
                        <td className="border border-gray-300 p-2">R$ {item.preco.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
