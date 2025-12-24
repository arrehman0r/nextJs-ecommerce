import React from "react";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { getCategoryProducts, getAllCategories } from "~/server/axiosApi";
import { useCategoryProducts } from "~/hooks/useProducts";

// Generate static paths for all categories
export async function getStaticPaths() {
  try {
    const categories = await getAllCategories();
    const paths = (categories || []).map((cat) => ({
      params: { categoryId: String(cat.id) },
    }));
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error("Error fetching categories for paths:", error);
    return { paths: [], fallback: 'blocking' };
  }
}

// Static generation with ISR - only for page 1 (SEO)
export async function getStaticProps({ params }) {
  try {
    const categoryId = params?.categoryId;
    const perPage = 12;

    if (categoryId) {
      const result = await getCategoryProducts(categoryId, 1, perPage);
      return {
        props: {
          initialProducts: result.products,
          initialTotalProducts: result.totalProducts,
          initialTotalPages: result.totalPages,
          categoryId,
          perPage,
        },
        revalidate: 3600, // Revalidate every hour
      };
    }

    return {
      props: {
        initialProducts: [],
        initialTotalProducts: 0,
        initialTotalPages: 0,
        categoryId: null,
        perPage: 12,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching category products:", error);
    return {
      props: {
        initialProducts: [],
        initialTotalProducts: 0,
        initialTotalPages: 0,
        categoryId: params?.categoryId || null,
        perPage: 12,
      },
      revalidate: 60, // Retry sooner on error
    };
  }
}

function Shop({ initialProducts, initialTotalProducts, initialTotalPages, categoryId, perPage }) {
  const router = useRouter();
  const page = parseInt(router.query?.page) || 1;

  // Prepare fallback data ONLY for page 1 (from SSR)
  // Other pages will be fetched by SWR and cached
  const fallbackData = (page === 1 && initialProducts.length > 0) ? {
    products: initialProducts,
    totalProducts: initialTotalProducts,
    totalPages: initialTotalPages,
  } : null;

  // SWR for client-side caching - uses initial data from SSR for page 1
  // All subsequent pages are fetched by SWR and cached
  const { products, totalProducts, totalPages, isLoading } = useCategoryProducts(
    categoryId,
    page,
    perPage,
    fallbackData
  );

  // Show loading state only when SWR is fetching and we have no cached data
  const showLoading = isLoading && products.length === 0;

  return (
    <main className="main">
      <Helmet>
        <title>Party Shope Web Store - Shop Page</title>
      </Helmet>

      <h1 className="d-none">Party Shope Web Store - Shop Page</h1>

      <ShopBanner />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            {/* <SidebarFilterOne /> */}

            <div className="col-lg-9 main-content">
              {showLoading ? (
                <div className="row product-wrapper cols-2 cols-sm-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                    <div className="product-loading-overlay" key={'skel-' + item}></div>
                  ))}
                </div>
              ) : (
                <ProductListOne 
                  products={products} 
                  totalProducts={totalProducts}
                  totalPages={totalPages}
                  currentPage={page}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
