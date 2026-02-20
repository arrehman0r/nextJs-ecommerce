import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

import { instance } from '~/server/instance';
import { modalActions } from '~/store/modal';

// Dynamic imports for heavy libraries - only load when modal opens
const Modal = dynamic(() => import('react-modal').then(mod => {
    mod.default.setAppElement('#__next');
    return mod.default;
}), { ssr: false });

const Magnifier = dynamic(
    () => import('react-image-magnifiers').then(mod => mod.Magnifier),
    { ssr: false, loading: () => <div className="skeleton-image" /> }
);

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), {
    ssr: false,
    loading: () => <div className="skeleton-carousel" />
});

const DetailOne = dynamic(() => import('~/components/partials/product/detail/detail-one'), {
    ssr: false,
    loading: () => <div className="skel-pro-summary" />
});

// Swiper options for product images
const productSliderOptions = {
    items: 1,
    nav: true,
    dots: false,
    autoHeight: false
};

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

function Quickview(props) {
    const { slug, closeQuickview, isOpen } = props;

    if (!isOpen) return null;

    const [loaded, setLoadingState] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch product using axios instead of Apollo
    useEffect(() => {
        if (slug && isOpen) {
            setLoading(true);
            instance.get(`products/${slug}`)
                .then(response => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [slug, isOpen]);

    useEffect(() => {
        // Set loaded state after images are ready
        const loadImages = async () => {
            if (!loading && product && isOpen && document.querySelector('.quickview-modal')) {
                const imagesLoaded = (await import('imagesloaded')).default;
                imagesLoaded('.quickview-modal').on('done', function () {
                    setLoadingState(true);
                }).on('progress', function () {
                    setLoadingState(false);
                });
            }
        };
        setTimeout(loadImages, 200);
    }, [product, isOpen, loading]);

    if (slug === '' || !product) return null;

    const closeQuick = () => {
        document.querySelector(".ReactModal__Overlay").classList.add('removed');
        document.querySelector('.quickview-modal').classList.add('removed');
        setLoadingState(false)
        setTimeout(() => {
            closeQuickview();
        }, 330);
    }

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="QuickView"
            onRequestClose={closeQuick}
            shouldFocusAfterRender={false}
            style={customStyles}
            className="product product-single row product-popup quickview-modal" id="product-quickview"
        >
            <>
                <div className={`row p-0 m-0 ${loaded ? '' : 'd-none'}`} >
                    <div className="col-md-6">
                        <div className="product-gallery mb-md-0 pb-0">
                            <div className="product-label-group">
                                {product.is_new ? <label className="product-label label-new">New</label> : ''}
                                {product.is_top ? <label className="product-label label-top">Top</label> : ''}
                                {
                                    product.discount > 0 ?
                                        (product.variations?.length || 0) === 0 ?
                                            <label className="product-label label-sale">{product.discount}% OFF</label>
                                            : <label className="product-label label-sale">Sale</label>
                                        : ''
                                }
                            </div>

                            <SwiperCarousel adClass="product-single-carousel" options={productSliderOptions}>
                                {
                                    product && product.images && product.images.map((item, index) =>
                                        <Magnifier
                                            key={'quickview-image-' + index}
                                            imageSrc={item.src}
                                            imageAlt="magnifier"
                                            largeImageSrc={item.src}
                                            dragToMove={false}
                                            mouseActivation="hover"
                                            cursorStyleActive="crosshair"
                                            className="product-image large-image"
                                        />
                                    )
                                }
                            </SwiperCarousel>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <DetailOne product={product} adClass="scrollable pr-3" isNav={false} />
                    </div>
                </div>

                <button title="Close (Esc)" type="button" className="mfp-close p-0" onClick={closeQuick}><span>×</span></button>
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