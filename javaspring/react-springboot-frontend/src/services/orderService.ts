import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pedidos';

export const getOrders = async () => {
  return await axios.get(API_URL);
};

export const createOrder = async (order: any) => {
    console.log(order)
  return await axios.post(API_URL, order);
};