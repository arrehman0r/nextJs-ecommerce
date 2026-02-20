import React from 'react';
import Reveal from 'react-awesome-reveal';
import dynamic from 'next/dynamic';

import ProductTwo from '~/components/features/product/product-two';

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), { ssr: false });

import { productSlider2 } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';

function FeaturedCollection ( props ) {
    const { products, loading } = props;

    return (
        <Reveal keyframes={ fadeIn } delay={ 600 } duration={ 1200 } triggerOnce>
            <section className="product-wrapper container mt-6 mt-md-10 pt-4 mb-10 pb-2">
                <h2 className="title title-center">Our Featured</h2>

                {
                    loading ?
                        <SwiperCarousel adClass="swiper-theme" options={ productSlider2 }>
                            {
                                [ 1, 2, 3, 4, 5 ].map( ( item ) =>
                                    <div className="product-loading-overlay" key={ 'featured-skel-' + item }></div>
                                )
                            }
                        </SwiperCarousel>
                        :
                        <SwiperCarousel adClass="swiper-theme" options={ productSlider2 }>
                            {
                                products && products.map( ( item, index ) =>
                                    <ProductTwo
                                        product={ item }
                                        key={ `featured-product-${ index }` } />
                                )
                            }
                        </SwiperCarousel>
                }
            </section>
        </Reveal>
    )
}

export default React.memo( FeaturedCollection );
