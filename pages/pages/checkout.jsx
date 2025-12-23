import { useEffect, useState } from "react";
import { connect, useDispatch, useStore } from "react-redux";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";

import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";

import SlideToggle from "react-slide-toggle";

import { toDecimal, getTotalPrice } from "~/utils";
import { createOrder } from "~/server/axiosApi";
import { useRouter } from 'next/navigation';
import { setLoading } from "~/store/utils";
import { showToast } from "~/server/instance";
import { triggerFacebookPixelPurchaseEvent } from "~/utils/facebookPixel";

// Error message styling
const errorMessageStyle = `
  .form-error-input {
    border-color: #dc3545 !important;
    border-width: 2px !important;
  }
  
  .form-error-input::placeholder {
    color: #dc3545;
    opacity: 1;
  }
`;


// Validation patterns
// Pakistani phone number formats: 03xx, 0923, 3, +92, etc.
const PHONE_REGEX = /^(\+92|0092|92|0)?[3][0-9]{9}$|^(\+92|0092|92)?[3][0-9]{9}$|^[03][0-9]{9,10}$/;
const POSTAL_CODE_REGEX = /^[0-9]{4,6}$/; // 4-6 digits for postal codes
const NAME_REGEX = /^[a-zA-Z\s'-]{2,}$/; // Letters, spaces, hyphens, apostrophes, min 2 chars

function Checkout(props) {
  const { cartList } = props;
  const dispatch = useDispatch()
  const store = useStore();
  const router = useRouter();
  console.log("this is cart list", cartList);
      // Trigger Facebook Pixel InitiateCheckout event when user visits cart page
    useEffect(() => {
        if (cartList.length > 0 && !hasTriggeredPixel.current) {
            triggerFacebookPixelInitiateCheckoutEvent(cartList, getTotalPrice(cartList));
            hasTriggeredPixel.current = true;
        }
    }, [cartList])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
    }
  });

  const handleCreateOrder = async (data) => {
    const lineItems = cartList.map(item => ({
      product_id: item.id,
      // variation_id: item.variationId, // If variationId exists
      quantity: item.qty,
    }));

    const email = data.email || "info@partyshope.com";
    const orderDetails = {
      payment_method: "bacs",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      billing: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address1,
        address_2: data.address2,
        city: data.city,
        state: data.state,
        postcode: data.zip,
        country: "PK",
        email: email,
        phone: data.phone,
      },
      shipping: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address1,
        address_2: data.address2,
        city: data.city,
        state: data.state,
        postcode: data.zip,
        country: "PK",
      },

      line_items: lineItems,

      shipping_lines: getTotalPrice(cartList) <= 2000 ? [ // Check if the order amount is less than or equal to 2000 Rs
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "100.00",
        },
      ] : [ // If the order amount is greater than 2000 Rs, apply free shipping
        {
          method_id: "free_shipping",
          method_title: "Free Shipping",
          total: "0.00",
        },
      ],
    };

    try {
      // Call createOrder function with the required data
      dispatch(setLoading(true))
      const response = await createOrder(orderDetails);
      console.log("Order created successfully:", response);
      // You can clear the cart like this:
      if (response.id) {
        // Trigger Facebook Pixel Purchase event
        const totalValue = getTotalPrice(cartList) + (getTotalPrice(cartList) <= 2000 ? 100 : 0);
        triggerFacebookPixelPurchaseEvent(cartList, totalValue, response.id);
        
        reset();
        store.dispatch({ type: "REFRESH_STORE", payload: { current: 1 } });
        router.push(`/order/${response.id}`);
      }
      // Handle success response as needed
    } catch (error) {
      console.error("Error creating order:", error);
      dispatch(setLoading(false))

      // Handle error as needed
    }
    finally {
      dispatch(setLoading(false))

    }
  };

  const handleFormErrors = (formErrors) => {
    // Display toast for the first error field
    const firstErrorField = Object.keys(formErrors)[0];
    if (firstErrorField && formErrors[firstErrorField]) {
      showToast("error", formErrors[firstErrorField].message);
    }
  };

  return (
    <main className="main checkout">
      <Helmet>
        <title>Party Shope Web Store | Checkout</title>
      </Helmet>
      <style>{errorMessageStyle}</style>

      <h1 className="d-none">Party Shope Web Store - Checkout</h1>

      <div
        className={`page-content pt-7 pb-10 ${
          cartList.length > 0 ? "mb-10" : "mb-2"
        }`}
      >
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>

          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="/pages/order">3. Order Complete</ALink>
          </h3>
        </div>
        <div className="container mt-7">
          {cartList.length > 0 ? (
            <>
              <div className="card accordion">
                <Card
                  type="parse"
                  title="<div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                            <i class='fas fa-exclamation-circle'></i> <span class='text-body'>Returning customer?</span> <a href='#' class='text-primary collapse'>Click here to login</a>
                        </div>"
                >
                  <div className="alert-body collapsed">
                    <p>
                      If you have shopped with us before, please enter your
                      details below. If you are a new customer, please proceed
                      to the Billing section.
                    </p>
                    <div className="row cols-md-2">
                      <form className="mb-4 mb-md-0">
                        <label htmlFor="username">Username Or Email *</label>
                        <input
                          type="text"
                          className="input-text form-control mb-0"
                          name="username"
                          id="username"
                          autoComplete="username"
                        />
                      </form>
                      <form className="mb-4 mb-md-0">
                        <label htmlFor="password">Password *</label>
                        <input
                          className="input-text form-control mb-0"
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      </form>
                    </div>
                    <div className="checkbox d-flex align-items-center justify-content-between">
                      <div className="form-checkbox pt-0 mb-0">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="signin-remember"
                          name="signin-remember"
                        />
                        <label
                          className="form-control-label"
                          htmlFor="signin-remember"
                        >
                          Remember Me
                        </label>
                      </div>
                      <ALink href="#" className="lost-link">
                        Lost your password?
                      </ALink>
                    </div>
                    <div className="link-group">
                      <ALink href="#" className="btn btn-dark btn-rounded mb-4">
                        Login
                      </ALink>{" "}
                      <span className="d-inline-block text-body font-weight-semi-bold">
                        or Login With
                      </span>{" "}
                      <div className="social-links mb-4">
                        <ALink
                          href="#"
                          className="social-link social-google fab fa-google"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-facebook fab fa-facebook-f"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-twitter fab fa-twitter"
                        ></ALink>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="card accordion">
                <Card
                  title="
                                            <div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                                                <i class='fas fa-exclamation-circle'></i>
                                                <span class='text-body'>Have a coupon?</span>
                                                <a href='#' class='text-primary'>Click here to enter your code</a>
                                            </div>"
                  type="parse"
                >
                  <div className="alert-body mb-4 collapsed">
                    <p>If you have a coupon code, please apply it below.</p>
                    <form className="check-coupon-box d-flex">
                      <input
                        type="text"
                        name="coupon_code"
                        className="input-text form-control text-grey ls-m mr-4"
                        id="coupon_code"
                        placeholder="Coupon code"
                      />
                      <button
                        type="submit"
                        className="btn btn-dark btn-rounded btn-outline"
                      >
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                </Card>
              </div>
              <form onSubmit={handleSubmit(handleCreateOrder, handleFormErrors)} className="form">
                <div className="row">
                  <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                    <h3 className="title title-simple text-left text-uppercase">
                      Billing Details
                    </h3>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>First Name *</label>
                        <input
                          type="text"
                          maxLength="50"
                          className={`form-control ${errors.firstName ? 'form-error-input' : ''}`}
                          placeholder={errors.firstName ? `⚠️ ${errors.firstName.message}` : ''}
                          {...register("firstName", {
                            required: "First Name is required",
                            pattern: {
                              value: NAME_REGEX,
                              message: "First Name must be at least 2 characters (letters, spaces, hyphens only)"
                            },
                            minLength: {
                              value: 2,
                              message: "First Name must be at least 2 characters"
                            }
                          })}
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          maxLength="50"
                          className={`form-control ${errors.lastName ? 'form-error-input' : ''}`}
                          placeholder={errors.lastName ? `⚠️ ${errors.lastName.message}` : ''}
                          {...register("lastName", {
                            required: "Last Name is required",
                            pattern: {
                              value: NAME_REGEX,
                              message: "Last Name must be at least 2 characters (letters, spaces, hyphens only)"
                            },
                            minLength: {
                              value: 2,
                              message: "Last Name must be at least 2 characters"
                            }
                          })}
                        />
                      </div>
                    </div>
                    {/* <label>Company Name (Optional)</label>
                                            <input type="text" className="form-control" name="company-name" required />
                                            <label>Country / Region *</label> */}
                    {/* <div className="select-box">
                                                <select name="country" className="form-control" defaultValue="us">
                                                    <option value="us">United States (US)</option>
                                                    <option value="uk"> United Kingdom</option>
                                                    <option value="fr">France</option>
                                                    <option value="aus">Austria</option>
                                                </select>
                                            </div> */}
                    <label>Street Address *</label>
                    <input
                      type="text"
                      maxLength="100"
                      className={`form-control ${errors.address1 ? 'form-error-input' : ''}`}
                      placeholder={errors.address1 ? `⚠️ ${errors.address1.message}` : 'House number and street name'}
                      {...register("address1", {
                        required: "Street Address is required",
                        minLength: {
                          value: 5,
                          message: "Street Address must be at least 5 characters"
                        },
                        maxLength: {
                          value: 100,
                          message: "Street Address must not exceed 100 characters"
                        }
                      })}
                    />
                    <input
                      type="text"
                      maxLength="100"
                      className={`form-control ${errors.address2 ? 'form-error-input' : ''}`}
                      placeholder={errors.address2 ? `⚠️ ${errors.address2.message}` : 'Apartment, suite, unit, etc. (optional)'}
                      {...register("address2", {
                        maxLength: {
                          value: 100,
                          message: "Address line 2 must not exceed 100 characters"
                        }
                      })}
                    />
                    <div className="row">
                      <div className="col-xs-6">
                        <label>Town / City *</label>
                        <input
                          type="text"
                          maxLength="50"
                          className={`form-control ${errors.city ? 'form-error-input' : ''}`}
                          placeholder={errors.city ? `⚠️ ${errors.city.message}` : ''}
                          {...register("city", {
                            required: "Town / City is required",
                            minLength: {
                              value: 2,
                              message: "City name must be at least 2 characters"
                            },
                            maxLength: {
                              value: 50,
                              message: "City name must not exceed 50 characters"
                            }
                          })}
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>State *</label>
                        <input
                          type="text"
                          maxLength="50"
                          className={`form-control ${errors.state ? 'form-error-input' : ''}`}
                          placeholder={errors.state ? `⚠️ ${errors.state.message}` : ''}
                          {...register("state", {
                            required: "State is required",
                            minLength: {
                              value: 2,
                              message: "State must be at least 2 characters"
                            },
                            maxLength: {
                              value: 50,
                              message: "State must not exceed 50 characters"
                            }
                          })}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>ZIP *</label>
                        <input
                          type="text"
                          maxLength="6"
                          className={`form-control ${errors.zip ? 'form-error-input' : ''}`}
                          placeholder={errors.zip ? `⚠️ ${errors.zip.message}` : ''}
                          {...register("zip", {
                            required: "ZIP/Postal Code is required",
                            pattern: {
                              value: POSTAL_CODE_REGEX,
                              message: "ZIP Code must be 4-6 digits"
                            }
                          })}
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          maxLength="15"
                          className={`form-control ${errors.phone ? 'form-error-input' : ''}`}
                          placeholder={errors.phone ? `⚠️ ${errors.phone.message}` : ''}
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: PHONE_REGEX,
                              message: "Enter a valid Pakistani number (03xx, 0923, +92, etc.)"
                            }
                          })}
                        />
                      </div>
                    </div>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      maxLength="100"
                      className={`form-control ${errors.email ? 'form-error-input' : ''}`}
                      placeholder={errors.email ? `⚠️ ${errors.email.message}` : ''}
                      {...register("email", {
                        required: "Email Address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />

                    {/* <SlideToggle duration={ 300 } collapsed >
                                                { ( { onToggle, setCollapsibleElement } ) => (
                                                    <div className="form-checkbox mb-0 pt-0">
                                                        <input type="checkbox" className="custom-checkbox" id="create-account" name="create-account" onChange={ onToggle } />
                                                        <label className='form-control-label ls-s' htmlFor='create-account'>Create an account?</label>

                                                        <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                                            <label htmlFor="account_username" className="pt-4">Account username&nbsp;
                                                                    <abbr className="required" title="required">*</abbr>
                                                            </label>

                                                            <input type="text" className="form-control" name="account_username" id="account_username" placeholder="Username" rows="5" />

                                                            <label htmlFor="account_password">Create account password&nbsp;
                                                                    <abbr className="required" title="required">*</abbr>
                                                            </label>

                                                            <input type="password" className="form-control mb-3" name="account_password" id="account_password" placeholder="Password" rows="5" />
                                                        </div>
                                                    </div>
                                                ) }
                                            </SlideToggle> */}

                    {/* <SlideToggle duration={ 300 } collapsed >
                                                { ( { onToggle, setCollapsibleElement } ) => (
                                                    <div className="form-checkbox mb-6">
                                                        <input type="checkbox" className="custom-checkbox" id="different-address" name="different-address" onChange={ onToggle } />
                                                        <label className='form-control-label ls-s' htmlFor='different-address'>Ship to a different address?</label>

                                                        <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                                            <div className="row pt-4">
                                                                <div className="col-xs-6">
                                                                    <label>First Name *</label>
                                                                    <input type="text" className="form-control" name="first-name" required />
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <label>Last Name *</label>
                                                                    <input type="text" className="form-control" name="last-name" required />
                                                                </div>
                                                            </div>
                                                            <label>Company Name (Optional)</label>
                                                            <input type="text" className="form-control" name="company-name" required />
                                                            <label>Country / Region *</label>
                                                            <div className="select-box">
                                                                <select name="country" className="form-control" defaultValue="us">
                                                                    <option value="us">United States (US)</option>
                                                                    <option value="uk"> United Kingdom</option>
                                                                    <option value="fr">France</option>
                                                                    <option value="aus">Austria</option>
                                                                </select>
                                                            </div>
                                                            <label>Street Address *</label>
                                                            <input type="text" className="form-control" name="address1" required
                                                                placeholder="House number and street name" />
                                                            <input type="text" className="form-control" name="address2" required
                                                                placeholder="Apartment, suite, unit, etc. (optional)" />
                                                            <div className="row">
                                                                <div className="col-xs-6">
                                                                    <label>Town / City *</label>
                                                                    <input type="text" className="form-control" name="city" required />
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <label>State *</label>
                                                                    <input type="text" className="form-control" name="state" required />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-xs-6">
                                                                    <label>ZIP *</label>
                                                                    <input type="text" className="form-control" name="zip" required />
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <label>Phone *</label>
                                                                    <input type="text" className="form-control" name="phone" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) }
                                            </SlideToggle> */}

                    <h2 className="title title-simple text-uppercase text-left mt-6">
                      Additional Information
                    </h2>
                    <label>Order Notes (Optional)</label>
                    <textarea
                      className="form-control pb-2 pt-2 mb-0"
                      cols="30"
                      rows="5"
                      maxLength={80}
                      placeholder="Notes about your order, e.g. special notes for delivery"
                    ></textarea>
                  </div>

                  <aside className="col-lg-5 sticky-sidebar-wrapper">
                    <div
                      className="sticky-sidebar mt-1"
                      data-sticky-options="{'bottom': 50}"
                    >
                      <div className="summary pt-5">
                        <h3 className="title title-simple text-left text-uppercase">
                          Your Order
                        </h3>
                        <table className="order-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartList.map((item) => (
                              <tr key={item.name}>
                                <td className="product-name">
                                  {item.name}{" "}
                                  <span className="product-quantity">
                                    ×&nbsp;{item.qty}
                                  </span>
                                </td>
                                <td className="product-total text-body">
                                  Rs.{toDecimal(item.price * item.qty)}
                                </td>
                              </tr>
                            ))}

                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Subtotal</h4>
                              </td>
                              <td className="summary-subtotal-price pb-0 pt-0">
                                Rs.{toDecimal(getTotalPrice(cartList))}
                              </td>
                            </tr>
                            <tr className="sumnary-shipping shipping-row-last">

                              {getTotalPrice(cartList) <= 2000 ?
                                (<>  <td>
                                  <h4 className="summary-subtitle">
                                    Flat Shipping
                                  </h4>
                                </td>

                                  <td>Rs.100</td></>) : (<>  <td>
                                    <h4 className="summary-subtitle">
                                      Free Shipping
                                    </h4>
                                  </td>

                                    <td>Rs.00</td></>)}

                              {/* <ul> */}
                              {/* <li>
                                                                            <div className="custom-radio">
                                                                                <input type="radio" id="flat_rate"
                                                                                    name="shipping" className="custom-control-input" defaultChecked />
                                                                                <label className="custom-control-label"
                                                                                    htmlFor="flat_rate">Flat rate</label>
                                                                            </div>
                                                                        </li> */}

                              {/* <li>
                                                                            <div className="custom-radio">
                                                                                <input type="radio" id="free-shipping"
                                                                                    name="shipping" className="custom-control-input" />
                                                                                <label className="custom-control-label"
                                                                                    htmlFor="free-shipping">Free shipping</label>
                                                                            </div>
                                                                        </li> */}

                              {/* <li>
                                                                            <div className="custom-radio">
                                                                                <input type="radio" id="local_pickup"
                                                                                    name="shipping" className="custom-control-input" />
                                                                                <label className="custom-control-label"
                                                                                    htmlFor="local_pickup">Local pickup</label>
                                                                            </div>
                                                                        </li> */}
                              {/* </ul> */}
                            </tr>
                            <tr className="summary-total">
                              <td className="pb-0">
                                <h4 className="summary-subtitle">Total</h4>
                              </td>
                              <td className=" pt-0 pb-0">
                                <p className="summary-total-price ls-s text-primary">
                                  Rs.{toDecimal(getTotalPrice(cartList) + (getTotalPrice(cartList) <= 2000 ? 100 : 0))}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="payment accordion radio-type">
                          <h4 className="summary-subtitle ls-m pb-3">
                            Payment Methods
                          </h4>

                          <div className="checkbox-group">
                            {/* <div className="card-header">
                                                                <ALink href="#" className={ `text-body text-normal ls-m ${ isFirst ? 'collapse' : '' }` } onClick={ () => { !isFirst && setFirst( !isFirst ) } }>Check payments</ALink>
                                                            </div> */}

                            {/* <Collapse in={ isFirst }>
                                                                <div className="card-wrapper">
                                                                    <div className="card-body ls-m overflow-hidden">
                                                                        Please send a check to Store Name, Store Street,
                                                                        Store Town, Store State / County, Store Postcode.
                                                                    </div>
                                                                </div>
                                                            </Collapse> */}

                            <div className="custom-radio">
                              <input
                                type="radio"
                                id="local_pickup"
                                defaultChecked
                                name="shipping"
                                className="custom-control-input"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="local_pickup"
                              >
                                Cash on Delivery
                              </label>

                              {/* <ALink href="#" className={ `text-body text-normal ls-m ${ !isFirst ? 'collapse' : '' }` } onClick={ () => { isFirst && setFirst( !isFirst ) } }>Cash on delivery</ALink> */}
                            </div>

                            {/* <Collapse in={ !isFirst }>
                                                                <div className="card-wrapper">
                                                                    <div className="card-body ls-m overflow-hidden">
                                                                        Please send a check to Store Name, Store Street,
                                                                        Store Town, Store State / County, Store Postcode.
                                                                    </div>
                                                                </div>
                                                            </Collapse> */}
                          </div>
                        </div>
                        <div className="form-checkbox mt-4 mb-5">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id="terms-condition"
                            name="terms-condition"
                          />
                          <label
                            className="form-control-label"
                            htmlFor="terms-condition"
                          >
                            I have read and agree to the terms
                            {/* <ALink href="#">terms and conditions </ALink>* */}
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-dark btn-rounded btn-order"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </form>
            </>
          ) : (
            <div className="empty-cart text-center">
              <p>Your cart is currently empty.</p>
              <i className="cart-empty d-icon-bag"></i>
              <p className="return-to-shop mb-0">
                <ALink
                  className="button wc-backward btn btn-dark btn-md"
                  href="/shop/all-products"
                >
                  Return to shop
                </ALink>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps)(Checkout);
