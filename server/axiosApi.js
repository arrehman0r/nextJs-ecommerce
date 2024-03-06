import { makeRequest } from "./instance";

export const getAllCategories = () => {
  return makeRequest("get", "products/categories");
};

export const getCategoryProducts = ({ id }) => {
  return makeRequest("get", `products/categories/${id}`);
};
