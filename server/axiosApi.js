import { makeRequest } from "./instance";

export const getAllCategories = () => {
  return makeRequest("get", "products/categories");
};

export const getCategoryProducts = ( id ) => {
  return makeRequest("get", `products?categories=${id}`);
};
export const getProduct = ( id ) => {
  return makeRequest("get", `products/${id}`);
};

export const createOrder = (body)=>{
  return makeRequest("post","orders", body);
};

export const retrieveOrder = (id)=>{
  return makeRequest("get",`orders/${id}`);
}

export const getAllProducts = ()=>{
  return makeRequest("get","products");
}