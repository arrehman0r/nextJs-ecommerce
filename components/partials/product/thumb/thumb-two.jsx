import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import { mainSlider15 } from '~/utils/data/carousel';

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), { ssr: false });

function ThumbTwo ( props ) {
    const { product, index = 0 } = props;
    let thumbs = product.images;
    const thumbRef = useRef( null );

    useEffect( () => {
        if ( thumbRef.current && index >= 0 ) {
            thumbRef.current.slideTo( index, 300 );

            if ( document.querySelector( '.product-thumbs' ) ) {
                const activeThumb = document.querySelector( '.product-thumbs .product-thumb.active' );
                if ( activeThumb ) activeThumb.classList.remove( 'active' );
                const allThumbs = document.querySelectorAll( '.product-thumbs .product-thumb' );
                if ( allThumbs[ index ] ) {
                    allThumbs[ index ].classList.add( 'active' );
                }
            }
        }
    }, [ index ] )

    const thumbActiveHandler = ( e, thumbIndex ) => {
        props.onChangeIndex( thumbIndex );
        const activeThumb = document.querySelector( '.product-thumbs .product-thumb.active' );
        if ( activeThumb ) activeThumb.classList.remove( 'active' );
        e.currentTarget.classList.add( 'active' );
    }

    const changeRefHandler = ( carRef ) => {
        if ( carRef.current !== undefined && thumbRef.current === null ) {
            thumbRef.current = carRef.current;
        }
    }

    return (
        <div className="product-thumbs-wrap product-thumbs-two">
            <SwiperCarousel adClass="product-thumbs product-thumb-carousel" options={ mainSlider15 } onChangeRef={ changeRefHandler }>
                {
                    thumbs.map( ( thumb, index ) => (
                        <div className={ `product-thumb ${ index === 0 ? 'active' : '' }` } onClick={ ( e ) => { thumbActiveHandler( e, index ) } } key={ thumb + '-2-' + index }>
                            <img src={   thumb.src } alt="product thumbnail" width="137" height="137" />
                        </div>
                    ) )
                }
            </SwiperCarousel>
        </div >
    )
}

export default React.memo( ThumbTwo );