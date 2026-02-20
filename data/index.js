import {
  getAllCategories,
  getCategoryProducts,
  getProduct,
} from "./../server/axiosApi";

export async function getStaticProps({ params }) {
  try {
    const categories = await getAllCategories();
    
    // Only fetch product if productId is defined
    const productId = params?.productId;
    const product = productId ? await getProduct(productId) : null;

    const categoryId = params?.categoryId;
    const categoryProducts = categoryId
      ? await getCategoryProducts(categoryId, 1, 12)
      : { products: [], totalProducts: 0, totalPages: 1, currentPage: 1 };

    return {
      props: {
        categories,
        categoryProducts: categoryProducts.products || [],
        totalProducts: categoryProducts.totalProducts || 0,
        totalPages: categoryProducts.totalPages || 1,
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
        categoryProducts: [],
        totalProducts: 0,
        totalPages: 1,
        product: null,
      },
    };
  }
}
