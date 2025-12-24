import useSWR from 'swr';
import { instance } from '~/server/instance';

// Fetcher function for SWR
const fetcher = async (url) => {
  const response = await instance.get(url);
  return {
    products: response.data,
    totalProducts: parseInt(response.headers?.["x-wp-total"] || 0),
    totalPages: parseInt(response.headers?.["x-wp-totalpages"] || 1),
  };
};

// Hook for fetching category products with caching
export function useCategoryProducts(categoryId, page = 1, perPage = 12) {
  const { data, error, isLoading, mutate } = useSWR(
    categoryId ? `products?category=${categoryId}&page=${page}&per_page=${perPage}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch when window regains focus
      revalidateOnReconnect: false, // Don't refetch on reconnect
      dedupingInterval: 60000, // Dedupe requests within 60 seconds
      keepPreviousData: true, // Keep showing old data while fetching new
    }
  );

  return {
    products: data?.products || [],
    totalProducts: data?.totalProducts || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching all products with caching
export function useAllProducts(page = 1, perPage = 12) {
  const { data, error, isLoading, mutate } = useSWR(
    `products?page=${page}&per_page=${perPage}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
    }
  );

  return {
    products: data?.products || [],
    totalProducts: data?.totalProducts || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for fetching a single product
export function useProduct(productId) {
  const { data, error, isLoading } = useSWR(
    productId ? `products/${productId}` : null,
    async (url) => {
      const response = await instance.get(url);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache product for 5 minutes
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
  };
}

// Hook for fetching related products with caching
export function useRelatedProducts(relatedIds = []) {
  const { data, error, isLoading } = useSWR(
    relatedIds.length > 0 ? `related-${relatedIds.join('-')}` : null,
    async () => {
      const products = await Promise.all(
        relatedIds.slice(0, 6).map(async (id) => {
          try {
            const response = await instance.get(`products/${id}`);
            return response.data;
          } catch (e) {
            return null;
          }
        })
      );
      return products.filter(Boolean);
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  return {
    relatedProducts: data || [],
    isLoading,
    isError: error,
  };
}
