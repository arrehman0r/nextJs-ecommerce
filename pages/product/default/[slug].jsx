import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Helmet from "react-helmet";
import OwlCarousel from "~/components/features/owl-carousel";
import MediaOne from "~/components/partials/product/media/media-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import DescOne from "~/components/partials/product/desc/desc-one";
import RelatedProducts from "~/components/partials/product/related-products";
import { mainSlider17 } from "~/utils/data/carousel";
import { getProduct, getProductVariations } from "~/server/axiosApi";
import { getAllProducts } from "../../../server/axiosApi";
import { triggerFacebookPixelViewContentEvent } from "~/utils/facebookPixel";
import { useProduct, useRelatedProducts, useProductVariations } from "~/hooks/useProducts";

export async function getStaticPaths() {
  // Fetch a list of all product IDs from your backend (adjust the API endpoint as needed)
  const result = await getAllProducts(1, 100); // Fetch up to 100 products for static paths
  const products = result.products || [];
  // Extract IDs from products and convert them to strings
  const paths = products.map((product) => ({
    params: { slug: String(product.id) },
  }));

  // Set fallback: 'blocking' to handle products not pre-rendered at build time
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  try {
    const product = await getProduct(slug);
    
    // Fetch variations if product has them (variable product)
    let variations = [];
    if (product.variations && product.variations.length > 0) {
      try {
        variations = await getProductVariations(slug);
      } catch (e) {
        console.error("Error fetching variations:", e);
      }
    }
    
    // Fetch related products
    const relatedProducts = await Promise.all(
      (product.related_ids || []).slice(0, 6).map(async (id) => {
        try {
          return await getProduct(id);
        } catch (e) {
          return null;
        }
      })
    );
    return { 
      props: { 
        initialProduct: product, 
        initialRelatedProducts: relatedProducts.filter(Boolean),
        initialVariations: variations,
        productId: slug
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: { initialProduct: null, initialRelatedProducts: [], initialVariations: [], productId: slug },
      notFound: true,
    };
  }
}

function ProductDefault({ initialProduct, initialRelatedProducts, initialVariations, productId }) {
  const router = useRouter();
  const [loaded, setLoadingState] = useState(true);

  // SWR for client-side caching - uses initial data from SSG as fallback
  // This prevents refetching when navigating back to this page!
  const { product: swrProduct, isLoading: productLoading } = useProduct(
    productId, 
    initialProduct // Pass SSG data as fallback
  );
  const { relatedProducts: swrRelatedProducts } = useRelatedProducts(
    (swrProduct || initialProduct)?.related_ids || [],
    initialRelatedProducts // Pass SSG data as fallback
  );

  // Use SWR data (which includes fallback from SSG)
  const product = swrProduct || initialProduct;
  const relatedProducts = swrRelatedProducts.length > 0 ? swrRelatedProducts : initialRelatedProducts;

  // Fetch variations if product has variation IDs
  const { variations: swrVariations } = useProductVariations(
    productId,
    product?.variations || [],
    initialVariations
  );
  const variations = swrVariations.length > 0 ? swrVariations : initialVariations;

  useEffect(() => {
    if (product) {
      setLoadingState(false);
      triggerFacebookPixelViewContentEvent(product);
    }
  }, [product]);
console.log("Product data:", product);
  return (
    <main className="main mt-6 single-product">
      <Helmet>
        <title>{product?.name || "Product"} | Party Shope Web Store</title>
      </Helmet>

      <h1 className="d-none">Party Shope Web Store - Product Default</h1>

      {product ? (
        <div className={`page-content mb-10 pb-6 ${loaded ? "d-none" : ""}`}>
          <div className="container vertical">
            <div className="product product-single row mb-7">
              <div className="col-md-6 sticky-sidebar-wrapper">
                <MediaOne product={product} />
              </div>

              <div className="col-md-6">
                <DetailOne product={product} variations={variations} />
              </div>
            </div>

            <DescOne product={product} />

            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      ) : (
        <div className="skeleton-body container mb-10">
          <div className="row mb-7">
            <div className="col-md-6 pg-vertical">
              <div className="skel-pro-gallery"></div>
            </div>

            <div className="col-md-6">
              <div className="skel-pro-summary"></div>
            </div>
          </div>

          <div className="skel-pro-tabs"></div>
        </div>
      )}
    </main>
  );
}

export default ProductDefault;
