import { getAllCategories,getCategoryProducts } from './../server/axiosApi';
export async function getStaticProps({ params }) {
    try {
      const categories = await getAllCategories();
      const categoryId = params?.categoryId;
      const categoryProducts = categoryId ? await getCategoryProducts(categoryId) : [];
      console.log("categories data ", categories)
      return {
        props: {
          categories,
          categoryProducts
        },
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        props: {
          categories: [],
          categoryProducts:[]
        },
      };
    }
  }
  