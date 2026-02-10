// import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import { useRouter } from 'next/router';

import Breadcrumb from '~/components/features/breadcrumb';
import OwlCarousel from '~/components/features/owl-carousel';
import Pagination from '~/components/features/pagination';

// import { GET_PRODUCTS } from '~/server/queries';
// import withApollo from '~/server/apollo';

import ProductOne from '~/components/features/product/product-one';
import ProductTwo from '~/components/features/product/product-two';
// import ProductTwo from '~/components/features/product/product-two';
// import ProductThree from '~/components/features/product/product-three';
// import ProductFour from '~/components/features/product/product-four';
// import ProductFive from '~/components/features/product/product-five';
// import ProductSix from '~/components/features/product/product-six';
// import ProductSeven from '~/components/features/product/product-seven';
// import ProductEight from '~/components/features/product/product-eight';
// import SmallProduct from '~/components/features/product/product-sm';
// import ElementsList from '~/components/partials/elements/elements-list';

// import { mainSlider1, mainSlider7, mainSlider19 } from '~/utils/data/carousel';
import { getAllProducts } from '~/server/axiosApi';
import { useAllProducts } from '~/hooks/useProducts';


const DEFAULT_PER_PAGE = 12;

export async function getStaticProps() {
    try {
      const result = await getAllProducts(1, DEFAULT_PER_PAGE);
      return { 
        props: { 
          initialProducts: result.products,
          initialTotalProducts: result.totalProducts,
          initialTotalPages: result.totalPages,
          perPage: DEFAULT_PER_PAGE,
        },
        revalidate: 3600,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { 
        props: { 
          initialProducts: [],
          initialTotalProducts: 0,
          initialTotalPages: 0,
          perPage: DEFAULT_PER_PAGE,
        },
        revalidate: 60,
      };
    }
  }
  
function Products({ initialProducts, initialTotalProducts, initialTotalPages, perPage }) {
    const router = useRouter();
    const page = parseInt(router.query?.page) || 1;
    // Use per_page from URL if provided, otherwise fall back to props
    const currentPerPage = parseInt(router.query?.per_page) || perPage;

    // Prepare fallback data ONLY for page 1 with default perPage (from SSR)
    const fallbackData = (page === 1 && currentPerPage === perPage && initialProducts.length > 0) ? {
      products: initialProducts,
      totalProducts: initialTotalProducts,
      totalPages: initialTotalPages,
    } : null;

    // SWR for client-side caching
    const { products, totalProducts, totalPages, isLoading } = useAllProducts(
      page,
      currentPerPage,
      fallbackData
    );

    // Show loading state only when SWR is fetching and we have no cached data
    const showLoading = isLoading && products.length === 0;

    // const products = data ? data.products.data : [];
console.log("all products", { products, totalProducts, totalPages, page })
    return (
        <main className="skeleton-body">
            <Helmet>
                <title>Party Shope Web Store | Products</title>
            </Helmet>

            <h1 className="d-none">Party Shope Web Store - Products</h1>

            <Breadcrumb subTitle="Elements" title="Element Products" parentUrl="/elements" />

            <div className="page-content">
                <div className="container">
                    <section className="mt-10 pt-8">
                        <h2 className="title title-center">All Products</h2>

                        {
                            showLoading ?
                                <div className="row product-wrapper">
                                    {
                                        [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item ) =>
                                            <div className="col-md-3 col-6 product-loading-overlay" key={ 'default-skel-' + item }></div>
                                        )
                                    }
                                </div> :
                            products && products.length > 0 ?
                                <div className="row product-wrapper">
                                    {
                                        products.map( ( item ) =>
                                            <div className="col-md-3 col-6" key={ 'default-' + item.id }>
                                                {/* <ProductOne product={ item } /> */}
                                                  <ProductTwo product={ item } adClass="" />
                                            </div>
                                        )
                                    }
                                </div> :
                                <p className="ml-1">No products were found.</p>
                        }

                        {
                            products && products.length > 0 && !showLoading ?
                                <div className="toolbox toolbox-pagination mt-6">
                                    <p className="show-info">
                                        Showing <span>{currentPerPage * (page - 1) + 1} - {Math.min(currentPerPage * page, totalProducts)} of {totalProducts}</span> Products
                                    </p>
                                    <Pagination totalPage={totalPages} />
                                </div> : ''
                        }
                    </section>

                    {/* <section className="mt-8">
                        <h2 className="title title-center">Centered</h2>

                        {
                            !loading ?
                                <div className="row product-wrapper">
                                    {
                                        products.slice( 0, 4 ).map( ( item ) =>
                                            <div className="col-md-3 col-6" key={ 'centered-' + item.id }>
                                                <ProductTwo product={ item } />
                                            </div>
                                        )
                                    }
                                </div> :
                                <div className="row product-wrapper">
                                    {
                                        [ 1, 2, 3, 4 ].map( ( item ) =>
                                            <div className="col-md-3 col-6 product-loading-overlay" key={ 'centered-skel-' + item }></div>
                                        )
                                    }
                                </div>
                        }
                    </section> */}

                    {/* <section className="mt-8">
                        <h2 className="title title-center">Classic Button</h2>

                        {
                            !loading ?
                                <div className="row product-wrapper">
                                    {
                                        products.slice( 0, 4 ).map( ( item ) =>
                                            <div className="col-md-3 col-6" key={ 'classic-' + item.id }>
                                                <ProductThree product={ item } />
                                            </div>
                                        )
                                    }
                                </div> :
                                <div className="row product-wrapper">
                                    {
                                        [ 1, 2, 3, 4 ].map( ( item ) =>
                                            <div className="col-md-3 col-6 product-loading-overlay" key={ 'classic-skel-' + item }></div>
                                        )
                                    }
                                </div>
                        }
                    </section> */}
{/* 
                    <section className="mt-8">
                        <h2 className="title title-center">Pop-up</h2>

                        {
                            !loading ?
                                <div className="row product-wrapper">
                                    {
                                        products.slice( 0, 4 ).map( ( item ) =>
                                            <div className="col-md-3 col-6" key={ 'popup-' + item.id }>
                                                <ProductFour product={ item } />
                                            </div>
                                        )
                                    }
                                </div> :
                                <div className="row product-wrapper">
                                    {
                                        [ 1, 2, 3, 4 ].map( ( item ) =>
                                            <div className="col-md-3 col-6 product-loading-overlay" key={ 'popup-skel-' + item }></div>
                                        )
                                    }
                                </div>
                        }
                    </section> */}

                    {/* <section className="mt-8">
                        <h2 className="title title-center">Split Line 5 Columns</h2>

                        {
                            !loading ?
                                <div className="row product-wrapper split-line">
                                    {
                                        products.slice( 0, 5 ).map( ( item ) =>
                                            <div className="col-xl-5col col-lg-3 col-sm-4 col-6" key={ 'split-line-' + item.id }>
                                                <ProductFive product={ item } />
                                            </div>
                                        )
                                    }
                                </div> :
                                <div className="row product-wrapper split-line">
                                    {
                                        [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                            <div className="col-xl-5col col-lg-3 col-sm-4 col-6" key={ 'split-line-skel-' + item }></div>
                                        )
                                    }
                                </div>
                        }
                    </section> */}

                    {/* <section className="mt-10">
                        <h2 className="title title-center">Without Space</h2>

                        {
                            !loading ?
                                <OwlCarousel adClass="owl-theme gutter-xs" options={ mainSlider1 }>
                                    {
                                        products.slice( 0, 5 ).map( ( item ) =>
                                            <ProductTwo product={ item } key={ 'without-space-' + item.id } />
                                        )
                                    }
                                </OwlCarousel> :
                                <OwlCarousel adClass="owl-theme gutter-xs" options={ mainSlider1 }>
                                    {
                                        [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                            <div className="product-loading-overlay" key={ 'without-space-skel-' + item }></div>
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </section> */}

                    {/* <section className="mt-10 pt-2">
                        <h2 className="title title-center">Image Gap Style</h2>

                        {
                            !loading ?
                                <div className="row product-wrapper equal-height">
                                    {
                                        products.slice( 0, 4 ).map( ( item ) =>
                                            <div className="col-md-3 col-6" key={ 'image-gap-' + item.id }>
                                                <ProductTwo product={ item } adClass="product-image-gap" />
                                            </div>
                                        )
                                    }
                                </div> :
                                <div className="row product-wrapper equal-height">
                                    {
                                        [ 1, 2, 3, 4 ].map( ( item ) =>
                                            <div className="col-md-3 col-6 product-loading-overlay" key={ 'image-gap-skel-' + item }></div>
                                        )
                                    }
                                </div>
                        }
                    </section> */}

                    {/* <section className="mt-10">
                        <h2 className="title title-center">Modern Style 1</h2>

                        {
                            !loading ?
                                <OwlCarousel adClass="owl-theme" options={ mainSlider19 }>
                                    {
                                        products.slice( 0, 5 ).map( ( item ) =>
                                            <ProductSix product={ item } key={ 'modern-style-one-' + item.id } />
                                        )
                                    }
                                </OwlCarousel> :
                                <OwlCarousel adClass="owl-theme" options={ mainSlider19 }>
                                    {
                                        [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                            <div className="product-loading-overlay" key={ 'modern-style-one-skel-' + item }></div>
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </section> */}

                    {/* <section className="mt-10 pb-4">
                        <h2 className="title title-center">Modern Style 2</h2>

                        {
                            !loading ?
                                <OwlCarousel adClass="owl-theme" options={ mainSlider19 }>
                                    {
                                        products.slice( 0, 5 ).map( ( item ) =>
                                            <ProductSeven product={ item } key={ 'modern-style-two-' + item.id } />
                                        )
                                    }
                                </OwlCarousel> :
                                <OwlCarousel adClass="owl-theme" options={ mainSlider19 }>
                                    {
                                        [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                            <div className="product-loading-overlay" key={ 'modern-style-two-skel-' + item }></div>
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </section> */}

                    {/* <section className="mt-8">
                        <h2 className="title title-center">Product List</h2>

                        {
                            !loading ?
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="row">
                                            {
                                                products.slice( 0, 2 ).map( ( item ) =>
                                                    <div className="col-6 col-sm-12" key={ 'list-' + item.id }>
                                                        <ProductEight product={ item } />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="widget widget-products">
                                            <h4 className="widget-title">Our Featured</h4>

                                            <div className="widget-body">
                                                <OwlCarousel adClass="owl-nav-top" options={ mainSlider7 }>
                                                    <div className="products-col">
                                                        {
                                                            products.slice( 0, 4 ).map( item => (
                                                                <SmallProduct product={ item } key={ 'small-' + item.id } />
                                                            ) )
                                                        }
                                                    </div>

                                                    <div className="products-col">
                                                        {
                                                            products.slice( 4, 8 ).map( item => (
                                                                <SmallProduct product={ item } key={ 'small-' + item.id } />
                                                            ) )
                                                        }
                                                    </div>
                                                </OwlCarousel>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="row">
                                            {
                                                [ 1, 2 ].map( ( item ) =>
                                                    <div className="skel-pro skel-pro-list mb-4 col-6 col-sm-12" key={ 'list-skel-' + item }></div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="widget widget-products">
                                            <h4 className="widget-title">Our Featured</h4>

                                            <div className="widget-body">
                                                <OwlCarousel adClass="owl-nav-top" options={ mainSlider7 }>
                                                    <div className="products-col">
                                                        {
                                                            [ 1, 2, 3, 4 ].map( ( item ) =>
                                                                <div className="skel-pro-list mb-4" key={ 'small-skel-' + item }></div>
                                                            )
                                                        }
                                                    </div>

                                                    <div className="products-col">
                                                        {
                                                            [ 1, 2, 3, 4 ].map( ( item ) =>
                                                                <div className="skel-pro-list mb-4" key={ 'small-skel-one-' + item }></div>
                                                            )
                                                        }
                                                    </div>
                                                </OwlCarousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </section> */}
                </div>

           
            </div>
        </main>
    )
}

export default  Products ;