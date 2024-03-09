import { connect } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Countdown from "~/components/features/countdown";
import Quantity from "~/components/features/quantity";

import ProductNav from "~/components/partials/product/product-nav";

import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";

function DetailOne(props) {
  let router = useRouter();
  const {
    data,
    isStickyCart = false,
    adClass = "",
    isNav = true,
    product,
  } = props;
  const { toggleWishlist, addToCart, wishlist } = props;
  const [curColor, setCurColor] = useState("null");
  const [curSize, setCurSize] = useState("null");
  const [curIndex, setCurIndex] = useState(-1);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);
  // let product = data && product;

  // decide if the product is wishlisted
  let isWishlisted,
    colors = [],
    sizes = [];
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  if (product && product.variations.length > 0) {
    if (product.variations[0].size)
      product.variations.forEach((item) => {
        if (sizes.findIndex((size) => size.name === item.size.name) === -1) {
          sizes.push({ name: item.size.name, value: item.size.size });
        }
      });

    if (product.variations[0].color) {
      product.variations.forEach((item) => {
        if (colors.findIndex((color) => color.name === item.color.name) === -1)
          colors.push({ name: item.color.name, value: item.color.color });
      });
    }
  }

  useEffect(() => {
    return () => {
      setCurIndex(-1);
      resetValueHandler();
    };
  }, [product]);

  useEffect(() => {
    if (product.variations.length > 0) {
      if (
        (curSize !== "null" && curColor !== "null") ||
        (curSize === "null" &&
          product.variations[0].size === null &&
          curColor !== "null") ||
        (curColor === "null" &&
          product.variations[0].color === null &&
          curSize !== "null")
      ) {
        setCartActive(true);
        setCurIndex(
          product.variations.findIndex(
            (item) =>
              (item.size !== null &&
                item.color !== null &&
                item.color.name === curColor &&
                item.size.name === curSize) ||
              (item.size === null && item.color.name === curColor) ||
              (item.color === null && item.size.name === curSize)
          )
        );
      } else {
        setCartActive(false);
      }
    } else {
      setCartActive(true);
    }

    if (product.stock === 0) {
      setCartActive(false);
    }
  }, [curColor, curSize, product]);

  const wishlistHandler = (e) => {
    e.preventDefault();

    if (toggleWishlist && !isWishlisted) {
      let currentTarget = e.currentTarget;
      currentTarget.classList.add("load-more-overlay", "loading");
      toggleWishlist(product.data);

      setTimeout(() => {
        currentTarget.classList.remove("load-more-overlay", "loading");
      }, 1000);
    } else {
      router.push("/pages/wishlist");
    }
  };

  const setColorHandler = (e) => {
    setCurColor(e.target.value);
  };

  const setSizeHandler = (e) => {
    setCurSize(e.target.value);
  };

  const addToCartHandler = () => {
    if (product.stock_quantity > 0 && cartActive) {
      if (product.variations.length > 0) {
        let tmpName = product.name,
          tmpPrice;
        tmpName += curColor !== "null" ? "-" + curColor : "";
        tmpName += curSize !== "null" ? "-" + curSize : "";

        if (product.sale_price === product.regular_price) {
          tmpPrice = product.sale_price;
        } else if (
          !product.variations[0].sale_price &&
          product.regular_price > 0
        ) {
          tmpPrice = product.sale_price;
        } else {
          tmpPrice = product.variations[curIndex].regular_price
            ? product.variations[curIndex].regular_price
            : product.variations[curIndex].sale_price;
        }

        addToCart({
          ...product,
          name: tmpName,
          qty: quantity,
          sale_price: tmpPrice,
        });
      } else {
        addToCart({
          ...product,
          qty: quantity,
          sale_price: product.sale_price,
        });
      }
    }
  };

  const resetValueHandler = (e) => {
    setCurColor("null");
    setCurSize("null");
  };

  function isDisabled(color, size) {
    if (color === "null" || size === "null") return false;

    if (sizes.length === 0) {
      return (
        product.variations.findIndex((item) => item.color.name === curColor) ===
        -1
      );
    }

    if (colors.length === 0) {
      return (
        product.dvariations.findIndex((item) => item.size.name === curSize) ===
        -1
      );
    }

    return (
      product.variations.findIndex(
        (item) => item.color.name === color && item.size.name === size
      ) === -1
    );
  }

  function changeQty(qty) {
    setQauntity(qty);
  }

  return (
    <div className={"product-details " + adClass}>
      {isNav ? (
        <div className="product-navigation">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="#" className="active">
                Products
              </ALink>
            </li>
            <li>Detail</li>
          </ul>

          <ProductNav product={product} />
        </div>
      ) : (
        ""
      )}

      <h2 className="product-name">{product?.name}</h2>

      <div className="product-meta">
        SKU: <span className="product-sku">{product?.sku}</span>
        CATEGORIES:{" "}
        <span className="product-brand">
          {product.categories.map((item, index) => (
            <React.Fragment key={item.name + "-" + index}>
              <ALink
                href={{ pathname: "/shop", query: { category: item.slug } }}
              >
                {item.name}
              </ALink>
              {index < product.categories.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </span>
      </div>

      <div className="product-price mb-2">
        
        {product.sale_price !== product.regular_price ? (
          product.variations.length === 0 ||
          (product.variations.length > 0 &&
            !product.variations[0].sale_price) ? (
            <> 
              <ins className="new-price">
                ${product.sale_price}
              </ins>
              <del className="old-price">${product.regular_price}</del>
            </>
          ) : ( 
            <del className="new-price">
               
              ${toDecimal(product.sale_price)} – $
              {toDecimal(product.regular_price)}
            </del>
          )
        ) : (
          <ins className="new-price">${toDecimal(product.sale_price)}</ins>
        )}
      </div>

      {product.sale_price !== product.regular_price &&
      product.variations.length === 0 ? (
        <Countdown type={2} />
      ) : (
        ""
      )}

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

        <ALink href="#" className="rating-reviews">
          ( {product.reviews} reviews )
        </ALink>
      </div>

      <div className="product-short-desc" dangerouslySetInnerHTML={{ __html: product.short_description }} />
     
      {product && product.variations.length > 0 ? (
        <>
          {product.variations[0].color ? (
            <div className="product-form product-variations product-color">
              <label>Color:</label>
              <div className="select-box">
                <select
                  name="color"
                  className="form-control select-color"
                  onChange={setColorHandler}
                  value={curColor}
                >
                  <option value="null">Choose an option</option>
                  {colors.map((item) =>
                    !isDisabled(item.name, curSize) ? (
                      <option value={item.name} key={"color-" + item.name}>
                        {item.name}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              </div>
            </div>
          ) : (
            ""
          )}

          {product.variations[0].size ? (
            <div className="product-form product-variations product-size mb-0 pb-2">
              <label>Size:</label>
              <div className="product-form-group">
                <div className="select-box">
                  <select
                    name="size"
                    className="form-control select-size"
                    onChange={setSizeHandler}
                    value={curSize}
                  >
                    <option value="null">Choose an option</option>
                    {sizes.map((item) =>
                      !isDisabled(curColor, item.name) ? (
                        <option value={item.name} key={"size-" + item.name}>
                          {item.name}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </select>
                </div>

                <Collapse in={"null" !== curColor || "null" !== curSize}>
                  <div className="card-wrapper overflow-hidden reset-value-button w-100 mb-0">
                    <ALink
                      href="#"
                      className="product-variation-clean"
                      onClick={resetValueHandler}
                    >
                      Clean All
                    </ALink>
                  </div>
                </Collapse>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="product-variation-price">
            <Collapse in={cartActive && curIndex > -1}>
              <div className="card-wrapper">
                {curIndex > -1 ? (
                  <div className="single-product-price">
                    {product.variations[curIndex].sale_price ? (
                      product.variations[curIndex].regular_price ? (
                        <div className="product-price mb-0">
                          <ins className="new-price">
                            $
                            {toDecimal(product.variations[curIndex].regular_price)}
                          </ins>
                          <del className="old-price">
                            $
                            {toDecimal(
                              product.variations[curIndex].sale_price
                            )}
                          </del>
                        </div>
                      ) : (
                        <div className="product-price mb-0">
                          <ins className="new-price">
                            $
                            {toDecimal(
                              product.variations[curIndex].sale_price
                            )}
                          </ins>
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Collapse>
          </div>
        </>
      ) : (
        ""
      )}

      <hr className="product-divider"></hr>

      {isStickyCart ? (
        <div className="sticky-content fix-top product-sticky-content">
          <div className="container">
            <div className="sticky-product-details">
              <figure className="product-image">
                <ALink href={"/product/default/" + product.slug}>
                  <img
                    src={product.images[0].src}
                    width="90"
                    height="90"
                    alt="Product"
                  />
                </ALink>
              </figure>
              <div>
                <h4 className="product-title">
                  <ALink href={"/product/default/" + product.slug}>
                    {product.name}
                  </ALink>
                </h4>
                <div className="product-info">
                  <div className="product-price mb-0">
                    {curIndex > -1 && product.variations[0] ? (
                      product.variations[curIndex].sale_price ? (
                        product.variations[curIndex].regular_price ? (
                          <>
                            <ins className="new-price">
                              $
                              {toDecimal(
                                product.variations[curIndex].regular_price
                              )}
                            </ins>
                            <del className="old-price">
                              $
                              {toDecimal(
                                product.variations[curIndex].sale_price
                              )}
                            </del>
                          </>
                        ) : (
                          <>
                            <ins className="new-price">
                              $
                              {toDecimal(
                                product.variations[curIndex].sale_price
                              )}
                            </ins>
                          </>
                        )
                      ) : (
                        ""
                      )
                    ) : product.sale_price !== product.regular_price ? (
                      product.variations.length === 0 ? (
                        <>
                          <ins className="new-price">
                            ${toDecimal(product.sale_price)}
                          </ins>
                          <del className="old-price">
                            ${toDecimal(product.regular_price)}
                          </del>
                        </>
                      ) : (
                        <del className="new-price">
                          ${toDecimal(product.sale_price)} – $
                          {toDecimal(product.regular_price)}
                        </del>
                      )
                    ) : (
                      <ins className="new-price">
                        ${toDecimal(product.sale_price)}
                      </ins>
                    )}
                  </div>

                  <div className="ratings-container mb-0">
                    <div className="ratings-full">
                      <span
                        className="ratings"
                        style={{ width: 20 * product.ratings + "%" }}
                      ></span>
                      <span className="tooltiptext tooltip-top">
                        {toDecimal(product.ratings)}
                      </span>
                    </div>

                    <ALink href="#" className="rating-reviews">
                      ( {product.reviews} reviews )
                    </ALink>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-form product-qty pb-0">
              <label className="d-none">QTY:</label>
              <div className="product-form-group">
                <Quantity
                  max={product.stock_quantity}
                  product={product}
                  onChangeQty={changeQty}
                />
                <button
                  className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                    cartActive ? "" : "disabled"
                  }`}
                  onClick={addToCartHandler}
                >
                  <i className="d-icon-bag"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-form product-qty pb-0">
          <label className="d-none">QTY:</label>
          <div className="product-form-group">
            <Quantity
              max={product.stock_quantity}
              product={product}
              onChangeQty={changeQty}
            />
            <button
              className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                cartActive ? "" : "disabled"
              }`}
              onClick={addToCartHandler}
            >
              <i className="d-icon-bag"></i>Add to Cart
            </button>
          </div>
        </div>
      )}

      <hr className="product-divider mb-3"></hr>

      <div className="product-footer">
        <div className="social-links mr-4">
          <ALink
            href="#"
            className="social-link social-facebook fab fa-facebook-f"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-twitter fab fa-twitter"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-pinterest fab fa-pinterest-p"
          ></ALink>
        </div>{" "}
        <span className="divider d-lg-show"></span>{" "}
        <a
          href="#"
          className={`btn-product btn-wishlist`}
          title={isWishlisted ? "Browse wishlist" : "Add to wishlist"}
          onClick={wishlistHandler}
        >
          <i
            className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
          ></i>{" "}
          {isWishlisted ? "Browse wishlist" : "Add to Wishlist"}
        </a>
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
})(DetailOne);
