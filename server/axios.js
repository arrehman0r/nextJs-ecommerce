// pages/api/products.js
import axios from 'axios';

export default async function getAllProducts(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const consumerKey = 'ck_5178b1c36b67be97e00929724e35ecb24ab4295e';
  const consumerSecret = 'cs_1bc331a05fdf7091f2f3e71fbbdb8f76361af329';
  const url = 'https://partyshope.com/wp-json/wc/v3/products';

  const authData = {
    username: consumerKey,
    password: consumerSecret
  };

  try {
    const response = await axios.get(url, { auth: authData });
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
