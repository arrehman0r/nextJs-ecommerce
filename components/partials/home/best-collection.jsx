import React from 'react';
import Reveal from 'react-awesome-reveal';
import dynamic from 'next/dynamic';

import ProductTwo from '~/components/features/product/product-two';

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), { ssr: false });

import { productSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

function BestCollection ( props ) {
    const { products, loading } = props;

    return (
        <Reveal keyframes={ fadeIn } delay={ 300 } duration={ 1200 } triggerOnce>
            <section className="product-wrapper container mt-6 mt-md-10 pt-4 pb-8">
                <h2 className="title title-center mb-5">Best Sellers</h2>

                {
                    loading ?
                        <SwiperCarousel adClass="swiper-theme swiper-nav-full" options={ productSlider }>
                            {
                                [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                    <div className="product-loading-overlay" key={ 'best-selling-skel-' + item }></div>
                                )
                            }
                        </SwiperCarousel>
                        :
                        <SwiperCarousel adClass="swiper-theme swiper-nav-full" options={ productSlider }>
                            {
                                products && products.map( ( item, index ) =>
                                    <ProductTwo
                                        product={ item }
                                        key={ `top-selling-product ${ index }` }
                                    />
                                )
                            }
                        </SwiperCarousel>
                }
            </section>
        </Reveal>
    )
}

export default React.memo( BestCollection );
