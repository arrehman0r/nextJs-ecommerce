import React from "react";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { getCategoryProducts } from "~/server/axiosApi";
import { useCategoryProducts } from "~/hooks/useProducts";

export async function getServerSideProps({ params, query }) {
  try {
    const categoryId = params?.categoryId;
    const page = parseInt(query?.page) || 1;
    const perPage = parseInt(query?.per_page) || 12;

    const result = categoryId
      ? await getCategoryProducts(categoryId, page, perPage)
      : { products: [], totalProducts: 0, totalPages: 1, currentPage: 1 };

    return {
      props: {
        initialProducts: result.products,
        initialTotalProducts: result.totalProducts,
        initialTotalPages: result.totalPages,
        initialPage: page,
        categoryId,
        perPage,
      },
    };
  } catch (error) {
    console.error("Error fetching category products:", error);
    return {
      props: {
        initialProducts: [],
        initialTotalProducts: 0,
        initialTotalPages: 1,
        initialPage: 1,
        categoryId: params?.categoryId || null,
        perPage: 12,
      },
    };
  }
}

function Shop({ initialProducts, initialTotalProducts, initialTotalPages, initialPage, categoryId, perPage }) {
  const router = useRouter();
  const page = parseInt(router.query?.page) || initialPage;

  // SWR for client-side caching - uses initial data from SSR, then caches subsequent requests
  const { products, totalProducts, totalPages, isLoading } = useCategoryProducts(
    categoryId,
    page,
    perPage
  );

  // Use SWR data if available, otherwise fall back to initial SSR data
  const displayProducts = products.length > 0 ? products : initialProducts;
  const displayTotalProducts = totalProducts || initialTotalProducts;
  const displayTotalPages = totalPages || initialTotalPages;

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
              {isLoading && products.length === 0 ? (
                <div className="row product-wrapper cols-2 cols-sm-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                    <div className="product-loading-overlay" key={'skel-' + item}></div>
                  ))}
                </div>
              ) : (
                <ProductListOne 
                  products={displayProducts} 
                  totalProducts={displayTotalProducts}
                  totalPages={displayTotalPages}
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
