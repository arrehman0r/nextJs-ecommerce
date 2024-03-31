import React from "react";
import { Helmet } from "react-helmet";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { getStaticProps } from "~/data/index";
import { getAllCategories } from "~/server/axiosApi";

export async function getStaticPaths() {
  const categories = await getAllCategories(); // Implement this function to fetch category IDs
  console.log("all categories.......", categories);
  // Generate the paths based on the category IDs
  const paths = categories.map(({ id }) => ({
    params: { categoryId: String(id) },
  }));
  console.log("paths", paths);
  return { paths, fallback: false }; // Set fallback to false if you know all possible categories
}

function Shop({ categoryProducts }) {
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
              <ProductListOne products={categoryProducts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export { getStaticProps };
export default Shop;
