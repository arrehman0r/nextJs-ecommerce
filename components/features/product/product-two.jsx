import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";

function ProductTwo(props) {
  const {
    product,
    adClass = "text-center",
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    isCategory = true,
  } = props;

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.id === product.id) > -1 ? true : false;

  const showQuickviewHandler = () => {
    openQuickview(product.id);
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    addToCart({ ...product, qty: 1, price: product.regular_price });
  };

  return (
    <div className={`product text-left ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/default/${product.id}`}>
          <LazyLoadImage
            alt="product"
            src={product?.images[0]?.src}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
          />

          {product.images.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={product.images[1].src}
              threshold={500}
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ""
          )}
        </ALink>

        <div className="product-label-group">
          {product.is_new ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {product.is_top ? (
            <label className="product-label label-top">Top</label>
          ) : (
            ""
          )}
          {product.discount > 0 ? (
            product.variations.length === 0 ? (
              <label className="product-label label-sale">
                {product.discount}% OFF
              </label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ""
          )}
        </div>

        <div className="product-action-vertical">
          {product.variations.length > 0 ? (
            <ALink
              href={`/product/default/${product.id}`}
              className="btn-product-icon btn-cart"
              title="Go to product"
            >
              <i className="d-icon-arrow-right"></i>
            </ALink>
          ) : (
            <a
              href="#"
              className="btn-product-icon btn-cart"
              title="Add to cart"
              onClick={addToCartHandler}
            >
              <i className="d-icon-bag"></i>
            </a>
          )}
          <a
            href="#"
            className="btn-product-icon btn-wishlist"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
            ></i>
          </a>
        </div>

        <div className="product-action">
   
         <ALink href={`/product/default/${product.id}`}
            className="btn-product btn-quickview"
            title="Quick View"
            // onClick={showQuickviewHandler}
          >
            Quick View
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        {isCategory ? (
          <div className="product-cat">
            {product.categories
              ? product.categories.map((item, index) => (
                  <React.Fragment key={item.name + "-" + index}>
                    <ALink
                      href={{ pathname: "/shop", query: { category: item.id } }}
                    >
                      {item.name}
                      {index < product.categories.length - 1 ? ", " : ""}
                    </ALink>
                  </React.Fragment>
                ))
              : ""}
          </div>
        ) : (
          ""
        )}

        <h3 className="product-name">
          <ALink href={`/product/default/${product.id}`}>{product.name}</ALink>
        </h3>

        <div className="product-price">
          {product.regular_price !== product.sale_price ? (
            product.variations.length === 0 ||
            (product.variations.length > 0 && !product.variations[0].price) ? (
              <>
                <ins className="new-price">
                  Rs.{toDecimal(product.sale_price)}
                </ins>
                <del className="old-price">
                  Rs.{toDecimal(product.regular_price)}
                </del>
              </>
            ) : (
              <del className="new-price">
                Rs.{toDecimal(product.sale_price)} – Rs.
                {toDecimal(product.sale_price)}
              </del>
            )
          ) : (
            <ins className="new-price">
              Rs.{toDecimal(product.regular_price)}
            </ins>
          )}
        </div>

        <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * product.ratings + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.ratings)}
            </span>
          </div>

          <ALink
            href={`/product/default/${product.id}`}
            className="rating-reviews"
          >
            ( {product.reviews} reviews )
          </ALink>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  ...modalActions,
})(ProductTwo);
