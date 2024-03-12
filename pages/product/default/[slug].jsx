import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import Helmet from "react-helmet";
import imagesLoaded from "imagesloaded";

import withApollo from "~/server/apollo";
import { GET_PRODUCT } from "~/server/queries";

import OwlCarousel from "~/components/features/owl-carousel";

import MediaOne from "~/components/partials/product/media/media-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import DescOne from "~/components/partials/product/desc/desc-one";
import RelatedProducts from "~/components/partials/product/related-products";

import { mainSlider17 } from "~/utils/data/carousel";
import { getProduct } from "~/server/axiosApi";

export async function getServerSideProps({ params }) {
  const productId = params.slug;

  try {
    const product = await getProduct(productId);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: {
        product: null, // You might want to handle the case where product fetching fails
      },
    };
  }
}

function ProductDefault({ product }) {
  const [loaded, setLoadingState] = useState(true);

  useEffect(() => {
    if (product) {
      setLoadingState(false);
    }
  }, [product]);

  return (
    <main className="main mt-6 single-product">
      <Helmet>
        <title>Riode React eCommerce Template | Product Default</title>
      </Helmet>

      <h1 className="d-none">
        Riode React eCommerce Template - Product Default
      </h1>

      {product ? (
        <div className={`page-content mb-10 pb-6 ${loaded ? "d-none" : ""}`}>
          <div className="container vertical">
            <div className="product product-single row mb-7">
              <div className="col-md-6 sticky-sidebar-wrapper">
                <MediaOne product={product} />
              </div>

              <div className="col-md-6">
                <DetailOne product={product} />
              </div>
            </div>
            {console.log("this is single product", product)}
            <DescOne product={product} />

            <RelatedProducts products={product} />
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

          {/* <section className="pt-3 mt-4">
                    <h2 className="title justify-content-center">Related Products</h2>

                    <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={ mainSlider17 }>
                        {
                            [ 1, 2, 3, 4, 5, 6 ].map( ( item ) =>
                                <div className="product-loading-overlay" key={ 'popup-skel-' + item }></div>
                            )
                        }
                    </OwlCarousel>
                </section> */}
        </div>
      )}
    </main>
  );
}

// export default withApollo( { ssr: typeof window === 'undefined' } )( ProductDefault );
export default ProductDefault;
