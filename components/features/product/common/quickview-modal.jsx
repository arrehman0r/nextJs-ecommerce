import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Magnifier } from 'react-image-magnifiers';
import Modal from 'react-modal';
import imagesLoaded from 'imagesloaded';

import { instance } from '~/server/instance';

import OwlCarousel from '~/components/features/owl-carousel';

import DetailOne from '~/components/partials/product/detail/detail-one';

import { modalActions } from '~/store/modal';

import { mainSlider3 } from '~/utils/data/carousel';

const customStyles = {
    content: {
        position: "relative"
    },
    overlay: {
        background: 'rgba(0,0,0,.4)',
        zIndex: '10000',
        overflowX: 'hidden',
        overflowY: 'auto'
    }
}

Modal.setAppElement( '#__next' );

function Quickview( props ) {
    const { slug, closeQuickview, isOpen } = props;

    if ( !isOpen ) return <div></div>;

    const [ loaded, setLoadingState ] = useState( false );
    const [ product, setProduct ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    // Fetch product using axios instead of Apollo
    useEffect( () => {
        if ( slug && isOpen ) {
            setLoading( true );
            instance.get( `products/${ slug }` )
                .then( response => {
                    setProduct( response.data );
                    setLoading( false );
                } )
                .catch( error => {
                    console.error( 'Error fetching product:', error );
                    setLoading( false );
                } );
        }
    }, [ slug, isOpen ] );

    useEffect( () => {
        setTimeout( () => {
            if ( !loading && product && isOpen && document.querySelector( '.quickview-modal' ) )
                imagesLoaded( '.quickview-modal' ).on( 'done', function () {
                    setLoadingState( true );
                    window.jQuery( '.quickview-modal .product-single-carousel' ).trigger( 'refresh.owl.carousel' );
                } ).on( 'progress', function () {
                    setLoadingState( false );
                } );
        }, 200 );
    }, [ product, isOpen, loading ] );

    if ( slug === '' || !product ) return '';

    const closeQuick = () => {
        document.querySelector( ".ReactModal__Overlay" ).classList.add( 'removed' );
        document.querySelector( '.quickview-modal' ).classList.add( 'removed' );
        setLoadingState( false )
        setTimeout( () => {
            closeQuickview();
        }, 330 );
    }

    return (
        <Modal
            isOpen={ isOpen }
            contentLabel="QuickView"
            onRequestClose={ closeQuick }
            shouldFocusAfterRender={ false }
            style={ customStyles }
            className="product product-single row product-popup quickview-modal" id="product-quickview"
        >
            <>
                <div className={ `row p-0 m-0 ${ loaded ? '' : 'd-none' }` } >
                    <div className="col-md-6">
                        <div className="product-gallery mb-md-0 pb-0">
                            <div className="product-label-group">
                                { product.is_new ? <label className="product-label label-new">New</label> : '' }
                                { product.is_top ? <label className="product-label label-top">Top</label> : '' }
                                {
                                    product.discount > 0 ?
                                        (product.variations?.length || 0) === 0 ?
                                            <label className="product-label label-sale">{ product.discount }% OFF</label>
                                            : <label className="product-label label-sale">Sale</label>
                                        : ''
                                }
                            </div>

                            <OwlCarousel adClass="product-single-carousel owl-theme owl-nav-inner" options={ mainSlider3 }>
                                {
                                    product && product.images && product.images.map( ( item, index ) =>
                                        <Magnifier
                                            key={ 'quickview-image-' + index }
                                            imageSrc={ item.src }
                                            imageAlt="magnifier"
                                            largeImageSrc={ item.src }
                                            dragToMove={ false }
                                            mouseActivation="hover"
                                            cursorStyleActive="crosshair"
                                            className="product-image large-image"
                                        />
                                    )
                                }
                            </OwlCarousel>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <DetailOne product={ product } adClass="scrollable pr-3" isNav={ false } />
                    </div>
                </div>

                <button title="Close (Esc)" type="button" className="mfp-close p-0" onClick={ closeQuick } ><span>×</span></button>
            </>
            {
                loaded ? '' : <div className="product row p-0 m-0 skeleton-body mfp-product" >
                    <div className="col-md-6">
                        <div className="skel-pro-gallery">
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="skel-pro-summary"></div>
                    </div>
                </div>
            }
        </Modal>
    )
}

function mapStateToProps( state ) {
    return {
        slug: state.modal.singleSlug,
        isOpen: state.modal.quickview
    }
}

export default connect( mapStateToProps, { closeQuickview: modalActions.closeQuickview } )( Quickview );