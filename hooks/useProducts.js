import useSWR from 'swr';
import { instance } from '~/server/instance';

// Fetcher function for SWR
const fetcher = async (url) => {
  console.log('🔄 SWR FETCHING:', url); // Debug log - remove in production
  const response = await instance.get(url);
  return {
    products: response.data,
    totalProducts: parseInt(response.headers?.["x-wp-total"] || 0),
    totalPages: parseInt(response.headers?.["x-wp-totalpages"] || 1),
  };
};

// Hook for fetching category products with caching
export function useCategoryProducts(categoryId, page = 1, perPage = 12, fallbackData = null) {
  const cacheKey = categoryId ? `products?category=${categoryId}&page=${page}&per_page=${perPage}` : null;
  
  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    fetcher,
    {
      fallbackData: fallbackData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
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
export function useAllProducts(page = 1, perPage = 12, fallbackData = null) {
  const { data, error, isLoading, mutate } = useSWR(
    `products?page=${page}&per_page=${perPage}`,
    fetcher,
    {
      fallbackData: fallbackData, // Use SSR data as fallback
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: !fallbackData, // Only fetch on mount if no fallback data
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
export function useProduct(productId, fallbackData = null) {
  const { data, error, isLoading } = useSWR(
    productId ? `products/${productId}` : null,
    async (url) => {
      console.log('🔄 SWR FETCHING PRODUCT:', url);
      const response = await instance.get(url);
      return response.data;
    },
    {
      fallbackData: fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: !fallbackData, // Don't fetch if we have fallback
      revalidateIfStale: false,
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
export function useRelatedProducts(relatedIds = [], fallbackData = null) {
  const { data, error, isLoading } = useSWR(
    relatedIds.length > 0 ? `related-${relatedIds.join('-')}` : null,
    async () => {
      console.log('🔄 SWR FETCHING RELATED:', relatedIds);
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
      fallbackData: fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: !fallbackData, // Don't fetch if we have fallback
      revalidateIfStale: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  return {
    relatedProducts: data || [],
    isLoading,
    isError: error,
  };
}

// Hook for fetching product variations with caching
export function useProductVariations(productId, variationIds = [], fallbackData = null) {
  // Only fetch if product has variation IDs (is a variable product)
  const shouldFetch = productId && variationIds && variationIds.length > 0;
  
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `products/${productId}/variations` : null,
    async (url) => {
      console.log('🔄 SWR FETCHING VARIATIONS:', url);
      const response = await instance.get(url, { params: { per_page: 100 } });
      return response.data;
    },
    {
      fallbackData: fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: !fallbackData,
      revalidateIfStale: false,
      dedupingInterval: 300000, // Cache variations for 5 minutes
    }
  );

  return {
    variations: data || [],
    isLoading,
    isError: error,
  };
}
