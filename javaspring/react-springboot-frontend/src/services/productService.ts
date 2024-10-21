import axios from 'axios';

const API_URL = 'http://localhost:8080/api/produtos';

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const createProduct = async (product: any) => {
  return await axios.post(API_URL, product);
};