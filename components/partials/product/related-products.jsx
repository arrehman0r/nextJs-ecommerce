import dynamic from 'next/dynamic';

import ProductTwo from '~/components/features/product/product-two';

import { mainSlider17 } from '~/utils/data/carousel';

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), { ssr: false });

export default function RelatedProducts( props ) {
    const { products, adClass = "pt-3 mt-10" } = props;

    return (
        products.length > 0 ?
            <section className={ `${ adClass }` }>
                <h2 className="title justify-content-center">Related Products</h2>

                <SwiperCarousel adClass="swiper-carousel swiper-theme swiper-nav-full" options={ mainSlider17 }>
                    {
                        products && products.slice( 0, 5 ).map( ( item, index ) =>
                            <ProductTwo product={ item } key={ 'product-two-' + index } adClass='' />
                        )
                    }
                </SwiperCarousel>
            </section> : ''
    )
}