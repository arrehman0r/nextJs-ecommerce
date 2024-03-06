import React from 'react';
import { Helmet } from 'react-helmet';

import ShopBanner from '~/components/partials/shop/shop-banner';
import SidebarFilterOne from '~/components/partials/shop/sidebar/sidebar-filter-one'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';
import { getCategoryProducts } from '~/server/axiosApi';

export async function getServerSideProps({ query }) {
    const categoryId = query?.category;

    try {
        let categoryProducts = [];
        if (categoryId) {
            // Fetch products based on category ID
            categoryProducts = await getCategoryProducts(categoryId);
        }
        
        return {
            props: {
                categoryProducts
            }
        };
    } catch (error) {
        console.error('Error fetching category products:', error);
        return {
            props: {
                categoryProducts: []
            }
        };
    }
}
function Shop({ categoryProducts }) {

    return (
        <main className="main">
            <Helmet>
                <title>Riode React eCommerce Template - Shop Page</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Shop Page</h1>

            <ShopBanner />
           
{console.log("so these are categories product", categoryProducts)}
            <div className="page-content mb-10 pb-3">
                <div className="container">
                    <div className="row main-content-wrap gutter-lg">
                        <SidebarFilterOne />

                        <div className="col-lg-9 main-content">
                        <ProductListOne products={categoryProducts} />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default  Shop ;