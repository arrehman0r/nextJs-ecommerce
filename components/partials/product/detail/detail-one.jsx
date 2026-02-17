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
import ShippingTime from "~/components/features/shipping";
import FreeReturn from "~/components/features/free-returns";

function DetailOne(props) {
  let router = useRouter();
  const {
    data,
    isStickyCart = false,
    adClass = "",
    isNav = true,
    product,
    variations = [], // WooCommerce variations array
  } = props;
  const { toggleWishlist, addToCart, wishlist } = props;
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [curIndex, setCurIndex] = useState(-1);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.id === product.id) > -1 ? true : false;

  // Extract unique attributes from variations (WooCommerce structure)
  const attributeOptions = React.useMemo(() => {
    const attrs = {};
    if (variations && variations.length > 0) {
      variations.forEach((variation) => {
        if (variation.attributes) {
          variation.attributes.forEach((attr) => {
            if (!attrs[attr.name]) {
              attrs[attr.name] = new Set();
            }
            attrs[attr.name].add(attr.option);
          });
        }
      });
    }
    // Convert Sets to arrays
    Object.keys(attrs).forEach((key) => {
      attrs[key] = Array.from(attrs[key]);
    });
    return attrs;
  }, [variations]);

  const attributeNames = Object.keys(attributeOptions);

  useEffect(() => {
    return () => {
      setCurIndex(-1);
      resetValueHandler();
    };
  }, [product]);

  // Find matching variation based on selected attributes
  useEffect(() => {
    if (variations.length > 0) {
      const selectedCount = Object.keys(selectedAttributes).filter(
        (key) => selectedAttributes[key] !== "null"
      ).length;
      
      // Only activate cart when all attributes are selected
      if (selectedCount === attributeNames.length && attributeNames.length > 0) {
        // Find the variation that matches all selected attributes
        const matchIndex = variations.findIndex((variation) => {
          return variation.attributes.every((attr) => {
            return selectedAttributes[attr.name] === attr.option;
          });
        });
        
        if (matchIndex > -1) {
          setCurIndex(matchIndex);
          setCartActive(variations[matchIndex].purchasable !== false && (variations[matchIndex].stock_status === 'instock' || variations[matchIndex].stock_quantity > 0));
        } else {
          setCurIndex(-1);
          setCartActive(false);
        }
      } else {
        setCartActive(false);
        setCurIndex(-1);
      }
    } else {
      // No variations - simple product
      setCartActive(product.stock_quantity > 0);
    }
  }, [selectedAttributes, variations, attributeNames, product]);

  const wishlistHandler = (e) => {
    e.preventDefault();

    if (toggleWishlist && !isWishlisted) {
      let currentTarget = e.currentTarget;
      currentTarget.classList.add("load-more-overlay", "loading");
      toggleWishlist(product);

      setTimeout(() => {
        currentTarget.classList.remove("load-more-overlay", "loading");
      }, 1000);
    } else {
      router.push("/pages/wishlist");
    }
  };

  const handleAttributeChange = (attrName, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrName]: value,
    }));
  };

  const addToCartHandler = () => {
    if (cartActive) {
      if (variations.length > 0 && curIndex > -1) {
        // Variable product - include variation info
        const selectedVariation = variations[curIndex];
        const attrString = selectedVariation.attributes
          .map((attr) => attr.option)
          .join(" - ");
        
        addToCart({
          ...product,
          name: `${product.name} - ${attrString}`,
          qty: quantity,
          price: selectedVariation.price,
          sale_price: selectedVariation.sale_price || selectedVariation.price,
          regular_price: selectedVariation.regular_price || selectedVariation.price,
          variation_id: selectedVariation.id,
          variation: selectedVariation,
          selected_attributes: selectedAttributes,
          // Use variation image if available
          images: selectedVariation.image ? [selectedVariation.image] : product.images,
        });
      } else {
        // Simple product
        addToCart({
          ...product,
          qty: quantity,
          price: product.price,
          sale_price: product.sale_price,
        });
      }
    }
  };

  const resetValueHandler = (e) => {
    setSelectedAttributes({});
  };

  // Check if an option is available based on other selections
  function isOptionAvailable(attrName, optionValue) {
    // Find variations that have this option
    return variations.some((variation) => {
      const hasOption = variation.attributes.some(
        (attr) => attr.name === attrName && attr.option === optionValue
      );
      if (!hasOption) return false;
      
      // Check if other selected attributes match
      for (const [key, value] of Object.entries(selectedAttributes)) {
        if (key === attrName || value === "null") continue;
        const matches = variation.attributes.some(
          (attr) => attr.name === key && attr.option === value
        );
        if (!matches) return false;
      }
      return true;
    });
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
      {/* 
      <div className="product-meta">
        SKU: <span className="product-sku">{product?.sku}</span>
        CATEGORIES:
        <span className="product-brand">
          {product.categories.map((item, index) => (
            <React.Fragment key={item.name + "-" + index}>
              {index > 0 && ", "}{" "}
            
              {item.name}
            </React.Fragment>
          ))}
        </span>
      </div> */}
      <FreeReturn />
      <div className="product-price mb-2">
        {curIndex > -1 && variations[curIndex] ? (
          // Show selected variation price
          variations[curIndex].on_sale ? (
            <>
              <ins className="new-price">Rs.{toDecimal(variations[curIndex].sale_price)}</ins>
              <del className="old-price">Rs.{toDecimal(variations[curIndex].regular_price)}</del>
            </>
          ) : (
            <ins className="new-price">Rs.{toDecimal(variations[curIndex].price)}</ins>
          )
        ) : variations.length > 0 ? (
          // Show price range for variable product
          <span className="new-price">
            Rs.{toDecimal(Math.min(...variations.map(v => parseFloat(v.price) || 0)))} – Rs.
            {toDecimal(Math.max(...variations.map(v => parseFloat(v.price) || 0)))}
          </span>
        ) : product.sale_price !== product.regular_price ? (
          // Simple product with sale
          <>
            <ins className="new-price">Rs.{product.sale_price}</ins>
            <del className="old-price">Rs.{product.regular_price}</del>
          </>
        ) : (
          // Simple product regular price
          <ins className="new-price">Rs.{toDecimal(product.sale_price)}</ins>
        )}
      </div>

      {product.sale_price !== product.regular_price &&
      variations.length === 0 ? (
        <Countdown type={2} />
      ) : (
        ""
      )}
      <div>
        <ShippingTime />
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

        <ALink href="#" className="rating-reviews">
          ( {product.reviews} reviews )
        </ALink>
      </div>

      <div
        className="product-short-desc"
        dangerouslySetInnerHTML={{ __html: product.short_description }}
      />

      {variations && variations.length > 0 ? (
        <>
          {/* Dynamic attribute selectors for WooCommerce variations */}
          {attributeNames.map((attrName, index) => (
            <div 
              key={attrName} 
              className={`product-form product-variations ${index === attributeNames.length - 1 ? 'mb-0 pb-2' : ''}`}
            >
              <label>{attrName}:</label>
              <div className={index === attributeNames.length - 1 ? "product-form-group" : ""}>
                <div className="variation-buttons d-flex flex-wrap gap-2">
                  {attributeOptions[attrName].map((option) => {
                    const isAvailable = isOptionAvailable(attrName, option);
                    const isSelected = selectedAttributes[attrName] === option;
                    // Find the variation that matches this option to get its image
                    const matchingVariation = variations.find((v) => 
                      v.attributes.some((attr) => attr.name === attrName && attr.option === option)
                    );
                    const variationImage = matchingVariation?.image?.src;
                    
                    return (
                      <button
                        type="button"
                        key={`${attrName}-${option}`}
                        className={`variation btn btn-variation ${isSelected ? 'selected-variation-btn' : 'btn-outline-primary'} ${!isAvailable ? 'disabled btn-outline-secondary' : ''}`}
                        onClick={() => isAvailable && handleAttributeChange(attrName, isSelected ? "null" : option)}
                        disabled={!isAvailable}
                        style={{
                          minWidth: variationImage ? '80px' : '60px',
                          padding: variationImage ? '6px 10px' : '8px 16px',
                          marginRight: '8px',
                          marginBottom: '8px',
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          opacity: isAvailable ? 1 : 0.5,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {variationImage && (
                          <img 
                            src={variationImage} 
                            alt={option}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                        )}
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {index === attributeNames.length - 1 && (
                  <Collapse in={Object.values(selectedAttributes).some(v => v !== "null" && v !== undefined)}>
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
                )}
              </div>
            </div>
          ))}

          {/* Selected variation price display */}
          <div className="product-variation-price">
            <Collapse in={cartActive && curIndex > -1}>
              <div className="card-wrapper">
                {curIndex > -1 && variations[curIndex] ? (
                  <div className="single-product-price">
                    {variations[curIndex].on_sale ? (
                      <div className="product-price mb-0">
                        <ins className="new-price">
                          Rs.{toDecimal(variations[curIndex].sale_price)}
                        </ins>
                        <del className="old-price">
                          Rs.{toDecimal(variations[curIndex].regular_price)}
                        </del>
                      </div>
                    ) : variations[curIndex].price ? (
                      <div className="product-price mb-0">
                        <ins className="new-price">
                          Rs.{toDecimal(variations[curIndex].price)}
                        </ins>
                      </div>
                    ) : null}
                    {variations[curIndex].stock_status === 'outofstock' && (
                      <p className="stock-status text-danger">Out of Stock</p>
                    )}
                  </div>
                ) : null}
              </div>
            </Collapse>
          </div>
        </>
      ) : null}

      <hr className="product-divider"></hr>

      {isStickyCart ? (
        <div className="sticky-content fix-top product-sticky-content">
          <div className="container">
            <div className="sticky-product-details">
              <figure className="product-image">
                <ALink href={"/product/default/" + product.id}>
                  <img
                    src={curIndex > -1 && variations[curIndex]?.image?.src ? variations[curIndex].image.src : product.images[0]?.src}
                    width="90"
                    height="90"
                    alt="Product"
                  />
                </ALink>
              </figure>
              <div>
                <h4 className="product-title">
                  <ALink href={"/product/default/" + product.id}>
                    {product.name}
                  </ALink>
                </h4>
                <div className="product-info">
                  <div className="product-price mb-0">
                    {curIndex > -1 && variations[curIndex] ? (
                      variations[curIndex].on_sale ? (
                        <>
                          <ins className="new-price">
                            Rs.{toDecimal(variations[curIndex].sale_price)}
                          </ins>
                          <del className="old-price">
                            Rs.{toDecimal(variations[curIndex].regular_price)}
                          </del>
                        </>
                      ) : (
                        <ins className="new-price">
                          Rs.{toDecimal(variations[curIndex].price)}
                        </ins>
                      )
                    ) : variations.length > 0 ? (
                      <span className="new-price">
                        Rs.{toDecimal(Math.min(...variations.map(v => parseFloat(v.price) || 0)))} – Rs.
                        {toDecimal(Math.max(...variations.map(v => parseFloat(v.price) || 0)))}
                      </span>
                    ) : product.sale_price !== product.regular_price ? (
                      <>
                        <ins className="new-price">
                          Rs.{toDecimal(product.sale_price)}
                        </ins>
                        <del className="old-price">
                          Rs.{toDecimal(product.regular_price)}
                        </del>
                      </>
                    ) : (
                      <ins className="new-price">
                        Rs.{toDecimal(product.sale_price)}
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
                        {toDecimal(product.rating_count)}
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
                  max={curIndex > -1 && variations[curIndex] ? variations[curIndex].stock_quantity : product.stock_quantity}
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
              max={curIndex > -1 && variations[curIndex] ? variations[curIndex].stock_quantity : product.stock_quantity}
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
