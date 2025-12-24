import { makeRequest } from "./instance";

export const getAllCategories = async () => {
  const response = await makeRequest("get", "products/categories");
  return response?.data || response;
};

export const getCategoryProducts = async (id, page = 1, perPage = 12) => {
  const response = await makeRequest("get", `products`, {
    category: id,
    page: page,
    per_page: perPage
  });
  
  // Extract pagination info from headers
  const totalProducts = parseInt(response?.headers?.["x-wp-total"] || 0);
  const totalPages = parseInt(response?.headers?.["x-wp-totalpages"] || 1);
  
  return {
    products: response?.data || [],
    totalProducts,
    totalPages,
    currentPage: page
  };
};

export const getProduct = async (id) => {
  const response = await makeRequest("get", `products/${id}`);
  return response?.data || response;
};

export const createOrder = async (body) => {
  const response = await makeRequest("post", "orders", body);
  return response?.data || response;
};

export const retrieveOrder = async (id) => {
  const response = await makeRequest("get", `orders/${id}`);
  return response?.data || response;
};

export const getAllProducts = async (page = 1, perPage = 12) => {
  const response = await makeRequest("get", "products", {
    page: page,
    per_page: perPage
  });
  
  const totalProducts = parseInt(response?.headers?.["x-wp-total"] || 0);
  const totalPages = parseInt(response?.headers?.["x-wp-totalpages"] || 1);
  
  return {
    products: response?.data || [],
    totalProducts,
    totalPages,
    currentPage: page
  };
};

export const createCustomer = async (body) => {
  const response = await makeRequest("post", "customers", body);
  return response?.data || response;
}

export const loginCustomer = async (body) => {
  const response = await makeRequest("post", "token", body);
  return response?.data || response;
}
