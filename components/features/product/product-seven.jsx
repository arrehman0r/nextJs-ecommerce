import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';

import { toDecimal } from '~/utils';

import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';

function ProductSeven( props ) {
    const { product, adClass = 'text-center', toggleWishlist, wishlist, addToCart, openQuickview } = props;

    // decide if the product is wishlisted
    let isWishlisted;
    isWishlisted = wishlist.findIndex( item => item.id === product.id ) > -1 ? true : false;

    const showQuickviewHandler = () => {
        openQuickview( product.id );
    }

    const wishlistHandler = ( e ) => {
        if ( toggleWishlist ) {
            toggleWishlist( product );
        }

        e.preventDefault();
        let currentTarget = e.currentTarget;
        currentTarget.classList.add( 'load-more-overlay', 'loading' );

        setTimeout( () => {
            currentTarget.classList.remove( 'load-more-overlay', 'loading' );
        }, 1000 );
    }

    const addToCartHandler = ( e ) => {
        e.preventDefault();
        if ( product.stock > 0 ) {
            let qty = e.currentTarget.closest( '.product-with-qty' ).querySelector( '.product-quantity .quantity' ).value;
            addToCart( { ...product, qty: qty, price: product.sale_price } );
        }
    }

    return (
        <div className={ `product ${ product.variants.length > 0 ? 'product-variable' : '' } text-center shadow-media product-with-qty ${ adClass }` }>
            <figure className="product-media">
                <ALink href={ `/product/default/${ product.id }` }>
                    <LazyLoadImage
                        alt="product"
                        src={    product.images[ 0 ].src }
                        threshold={ 500 }
                        effect="opacity"
                        width="300"
                        height="338"
                    />

                    {
                        product.images.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={   product.images[ 1 ].url }
                                threshold={ 500 }
                                width="300"
                                height="338"
                                effect="opacity"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>

                <div className="product-label-group">
                    { product.is_new ? <label className="product-label label-new">New</label> : '' }
                    { product.is_top ? <label className="product-label label-top">Top</label> : '' }
                    {
                        product.discount > 0 ?
                            product.variants.length === 0 ?
                                <label className="product-label label-sale">{ product.discount }% OFF</label>
                                : <label className="product-label label-sale">Sale</label>
                            : ''
                    }
                </div>

                <div className="product-action-vertical">
                    <a href="#" className="btn-product-icon btn-wishlist" title={ isWishlisted ? 'Remove from wishlist' : 'Add to wishlist' } onClick={ wishlistHandler }>
                        <i className={ isWishlisted ? "d-icon-heart-full" : "d-icon-heart" }></i>
                    </a>
                </div>

                <div className="product-action">
                    <ALink href="#" className="btn-product btn-quickview" title="Quick View" onClick={ showQuickviewHandler }>Quick View</ALink>
                </div>
            </figure>

            <div className="product-details">
                <h3 className="product-name">
                    <ALink href={ `/product/default/${ product.id }` }>{ product.name }</ALink>
                </h3>

                <div className="product-price">
                    {
                        product.sale_price !== product.regular_price ?
                            product.variants.length === 0 || ( product.variants.length > 0 && !product.variants[ 0 ].price ) ?
                                <>
                                    <ins className="new-price">Rs.{ toDecimal( product.sale_price ) }</ins>
                                    <del className="old-price">Rs.{ toDecimal( product.regular_price ) }</del>
                                </>
                                :
                                < del className="new-price">Rs.{ toDecimal( product.sale_price ) } – Rs.{ toDecimal( product.regular_price ) }</del>
                            : <ins className="new-price">Rs.{ toDecimal( product.sale_price ) }</ins>
                    }
                </div>

                <div className="product-action">
                    {
                        product.variants.length > 0 ?
                            <ALink href={ `/product/default/${ product.id }` } className="btn-product btn-cart" title="Go to product">
                                <span>Select Options</span>
                            </ALink> :
                            <>
                                <Quantity max={ product.stock } product={ product } adClass="product-quantity" />
                                <a href="#" className="btn-product btn-cart" title="Add to cart" onClick={ addToCartHandler }>
                                    <i className="d-icon-bag"></i><span>Add to cart</span>
                                </a>
                            </>
                    }
                </div>
            </div>
        </div >
    )
}

function mapStateToProps( state ) {
    return {
        wishlist: state.wishlist.data ? state.wishlist.data : []
    }
}

export default connect( mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart, ...modalActions } )( ProductSeven );