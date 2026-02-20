import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Magnifier } from 'react-image-magnifiers';

import ALink from '~/components/features/custom-link';

import ThumbTwo from '~/components/partials/product/thumb/thumb-two';
import MediaLightBox from '~/components/partials/product/light-box';

import { mainSlider3 } from '~/utils/data/carousel';

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), { ssr: false });

export default function MediaFive( props ) {
    const { product, adClass = '' } = props;
    const [ index, setIndex ] = useState( 0 );
    const [ mediaIndex, setMediaIndex ] = useState( 0 );
    const [ isOpen, setOpenState ] = useState( false );
    const mediaRef = useRef( null );
    let lgImages = product.large_pictures ? product.large_pictures : product.images;

    useEffect( () => {
        setIndex( 0 );
    }, [ typeof window !== 'undefined' ? window.location.pathname : '' ] )

    useEffect( () => {
        if ( mediaRef.current && index >= 0 ) {
            mediaRef.current.slideTo( index, 300 );
        }
    }, [ index ] )

    const setIndexHandler = ( mediaIndex ) => {
        if ( mediaIndex !== index ) {
            setIndex( mediaIndex );
        }
    }

    const changeRefHandler = ( carRef ) => {
        if ( carRef.current !== undefined ) {
            mediaRef.current = carRef.current;
        }
    }

    const changeOpenState = openState => {
        setOpenState( openState );
    }

    const openLightBox = () => {
        setOpenState( true );
    }

    const handleSlideChange = ( swiper ) => {
        if ( document.querySelector( '.product-thumbs' ) ) {
            const activeThumbs = document.querySelectorAll( '.product-thumbs .product-thumb.active' );
            activeThumbs.forEach( thumb => thumb.classList.remove( 'active' ) );
            const allThumbs = document.querySelectorAll( '.product-thumbs .product-thumb' );
            if ( allThumbs[ swiper.realIndex ] ) {
                allThumbs[ swiper.realIndex ].classList.add( 'active' );
            }
        }
    }

    return (
        <div className={ `product-gallery product-gallery-vertical product-gallery-sticky ${ adClass }` }>
            <div className="product-label-group">
                {
                    product.stock === 0 ?
                        <label className="product-label label-out">out</label> : ""
                }

                {
                    product.is_top ?
                        <label className="product-label label-top">top</label> : ""
                }

                {
                    product.is_new ?
                        <label className="product-label label-new">new</label> : ""
                }

                {
                    product.discount ?
                        <label className="product-label label-sale">sale</label> : ""
                }
            </div>

            <SwiperCarousel adClass="product-single-carousel swiper-theme swiper-nav-inner"
                options={ mainSlider3 }
                onChangeIndex={ setIndexHandler }
                onChangeRef={ changeRefHandler }
                onSlideChange={ handleSlideChange }
            >
                {
                    lgImages.map( ( image, index ) =>
                        <div key={ image + '-' + index }>
                            <Magnifier
                                imageSrc={   image.url }
                                imageAlt="magnifier"
                                largeImageSrc={   image.url }
                                dragToMove={ false }
                                mouseActivation="hover"
                                cursorStyleActive="crosshair"
                                className="product-image large-image"

                            />
                        </div>
                    ) }
            </SwiperCarousel>

            <ALink href="#" className="product-image-full" onClick={ openLightBox }><i className="d-icon-zoom"></i></ALink>

            <ThumbTwo product={ product } index={ index } onChangeIndex={ setIndexHandler } />

            <MediaLightBox images={ lgImages } isOpen={ isOpen } changeOpenState={ changeOpenState } index={ index } product={ product } />
        </div>
    )
}