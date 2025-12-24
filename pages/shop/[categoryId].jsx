import React from "react";
import { Helmet } from "react-helmet";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { getCategoryProducts } from "~/server/axiosApi";

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
        categoryProducts: result.products,
        totalProducts: result.totalProducts,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        categoryId,
      },
    };
  } catch (error) {
    console.error("Error fetching category products:", error);
    return {
      props: {
        categoryProducts: [],
        totalProducts: 0,
        totalPages: 1,
        currentPage: 1,
        categoryId: params?.categoryId || null,
      },
    };
  }
}

function Shop({ categoryProducts, totalProducts, totalPages, currentPage }) {
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
              <ProductListOne 
                products={categoryProducts} 
                totalProducts={totalProducts}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
