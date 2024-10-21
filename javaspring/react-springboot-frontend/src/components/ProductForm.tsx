import React, { useState, useEffect } from 'react';
import { createProduct, getProducts } from '../services/productService';

export const ProductForm = () => {
  const [product, setProduct] = useState({
    nome: '',
    descricao: '',
    url_imagem: '',
    preco: 0,
  });

  const [products, setProducts] = useState<any[]>([]); // Estado para armazenar os produtos cadastrados

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data); // Atualiza o estado com os produtos recebidos da API
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Carregar os produtos quando o componente for montado
  useEffect(() => {
    fetchProducts(); // Carrega os produtos ao montar o componente
  }, []);

  // Função para criar um novo produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(product);
      alert('Produto criado com sucesso!');
      setProduct({ nome: '', descricao: '', url_imagem: '', preco: 0 }); // Limpa o formulário
      fetchProducts(); // Atualiza a lista de produtos após a criação
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <div>
      {/* Formulário para cadastrar produto */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={product.nome}
          onChange={(e) => setProduct({ ...product, nome: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={product.descricao}
          onChange={(e) => setProduct({ ...product, descricao: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={product.url_imagem}
          onChange={(e) => setProduct({ ...product, url_imagem: e.target.value })}
          className="block mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Preço"
          value={product.preco}
          onChange={(e) => setProduct({ ...product, preco: parseFloat(e.target.value) })}
          className="block mb-2 p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Criar Produto
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Produtos Cadastrados</h2>
      
      {/* Tabela para exibir os dados dos produtos */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Descrição</th>
            <th className="border border-gray-300 p-2">Preço (R$)</th>
            <th className="border border-gray-300 p-2">URL da Imagem</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.nome}</td>
              <td className="border border-gray-300 p-2">{product.descricao}</td>
              <td className="border border-gray-300 p-2">{product.preco.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <a href={product.url_imagem} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Ver Imagem
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
