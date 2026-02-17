import { connect } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';

import { cartActions } from '~/store/cart';

import { toDecimal, getTotalPrice } from '~/utils';
import { triggerFacebookPixelInitiateCheckoutEvent } from '~/utils/facebookPixel';

function Cart(props) {
    const { cartList, removeFromCart, updateCart } = props;
    const [cartItems, setCartItems] = useState([]);
   
    // Helper to get unique cart item key
    const getCartItemKey = (item) => {
        return item.variation_id 
            ? `${item.id}-${item.variation_id}` 
            : `${item.id}`;
    };

    useEffect(() => {
        setCartItems([...cartList]);
    }, [cartList])


    const onChangeQty = (itemKey, qty) => {
        setCartItems(cartItems.map(item => {
            return getCartItemKey(item) === itemKey ? { ...item, qty: qty } : item
        }));
    }

    const compareItems = () => {
        if (cartItems.length !== cartList.length) return false;

        for (let index = 0; index < cartItems.length; index++) {
            if (cartItems[index].qty !== cartList[index].qty) return false;
        }

        return true;
    }

    const update = () => {
        updateCart(cartItems);
    }
    
    // Get item price (use sale_price for variations)
    const getItemPrice = (item) => {
        return item.sale_price || item.price || 0;
    };
    
    // Get stock quantity (use variation stock if available)
    const getStockQuantity = (item) => {
        if (item.variation && item.variation.stock_quantity) {
            return item.variation.stock_quantity;
        }
        return item.stock_quantity;
    };
 
    return (
        <div className="main cart">
            <div className="page-content pt-7 pb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step active"><ALink href="#">1. Shopping Cart</ALink></h3>
                    <h3 className="title title-simple title-step"><ALink href="/pages/checkout">2. Checkout</ALink></h3>
                    <h3 className="title title-simple title-step"><ALink href="/pages/order">3. Order Complete</ALink></h3>
                </div>

                <div className="container mt-7 mb-2">
                    <div className="row">
                        {
                            cartItems.length > 0 ?
                                <>
                                    <div className="col-lg-8 col-md-12 pr-lg-4">
                                        <table className="shop-table cart-table">
                                            <thead>
                                                <tr>
                                                    <th><span>Product</span></th>
                                                    <th></th>
                                                    <th><span>Price</span></th>
                                                    <th><span>quantity</span></th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItems.map(item =>
                                                        <tr key={'cart-' + getCartItemKey(item)}>
                                                            <td className="product-thumbnail">
                                                                <figure>
                                                                    <ALink href={'/product/default/' + item.id}>
                                                                        <img src={item.images[0]?.src} width="100" height="100"
                                                                            alt="product" />
                                                                    </ALink>
                                                                </figure>
                                                            </td>
                                                            <td className="product-name">
                                                                <div className="product-name-section">
                                                                    <ALink href={'/product/default/' + item.id}>{item.name}</ALink>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal">
                                                                <span className="amount">Rs.{toDecimal(getItemPrice(item))}</span>
                                                            </td>

                                                            <td className="product-quantity">
                                                                <Quantity qty={item.qty} max={getStockQuantity(item)} onChangeQty={qty => onChangeQty(getCartItemKey(item), qty)} />
                                                            </td>
                                                            <td className="product-price">
                                                                <span className="amount">Rs.{toDecimal(getItemPrice(item) * item.qty)}</span>
                                                            </td>
                                                            <td className="product-close">
                                                                <ALink href="#" className="product-remove" title="Remove this product" onClick={() => removeFromCart(item)}>
                                                                    <i className="fas fa-times"></i>
                                                                </ALink>
                                                            </td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                        <div className="cart-actions mb-6 pt-4">
                                            <ALink href="/shop" className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"><i className="d-icon-arrow-left"></i>Continue Shopping</ALink>
                                            <button
                                                type="submit"
                                                className={`btn btn-outline btn-dark btn-md btn-rounded ${compareItems() ? ' btn-disabled' : ''}`}
                                                onClick={update}
                                            >
                                                Update Cart
                                            </button>
                                        </div>
                                        <div className="cart-coupon-box mb-8">
                                            <h4 className="title coupon-title text-uppercase ls-m">Coupon Discount</h4>
                                            <input type="text" name="coupon_code" className="input-text form-control text-grey ls-m mb-4"
                                                id="coupon_code" placeholder="Enter coupon code here..." />
                                            <button type="submit" className="btn btn-md btn-dark btn-rounded btn-outline">Apply Coupon</button>
                                        </div>
                                    </div>
                                    <aside className="col-lg-4 sticky-sidebar-wrapper">
                                        <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                                            <div className="summary mb-4">
                                                <h3 className="summary-title text-left">Cart Totals</h3>
                                                <table className="shipping">
                                                    <tbody>
                                                        <tr className="summary-subtotal">
                                                            <td>
                                                                <h4 className="summary-subtitle">Subtotal</h4>
                                                            </td>
                                                            <td>
                                                                <p className="summary-subtotal-price">Rs.{toDecimal(getTotalPrice(cartItems))}</p>
                                                            </td>
                                                        </tr>
                                                        <tr className="sumnary-shipping shipping-row-last">
                                                            <td colSpan="2">
                                                                <h4 className="summary-subtitle">Calculate Shipping</h4>
                                                            </td>

                                                        </tr>
                                                        {getTotalPrice(cartItems)<= 2000?   
                                                       ( <tr>
                                                            <td>
                                                                <div class="custom-radio">
                                                                    <input type="radio" id="flat_rate" name="shipping" class="custom-control-input" defaultChecked />
                                                                    <label class="custom-control-label" for="flat_rate">Flat rate</label>
                                                                </div>
                                                            </td>
                                                            <td>Rs.100</td>
                                                        </tr>) : 
                                                       ( <tr>
                                                            <td>
                                                                <div class="custom-radio">
                                                                    <input type="radio" id="flat_rate" name="shipping" class="custom-control-input" defaultChecked />
                                                                    <label class="custom-control-label" for="flat_rate">Free Shipping</label>
                                                                </div>
                                                            </td>
                                                            <td>Rs.00</td>
                                                        </tr>)}
                                                    </tbody>
                                                </table>
                                                {/* <div className="shipping-address">
                                                    <label>Shipping to <strong>CA.</strong></label>
                                                    <div className="select-box">
                                                        <select name="country" className="form-control" defaultValue="us">
                                                            <option value="us">United States (US)</option>
                                                            <option value="uk"> United Kingdom</option>
                                                            <option value="fr">France</option>
                                                            <option value="aus">Austria</option>
                                                        </select>
                                                    </div>
                                                    <div className="select-box">
                                                        <select name="country" className="form-control" defaultValue="us">
                                                            <option value="us">California</option>
                                                            <option value="uk">Alaska</option>
                                                            <option value="fr">Delaware</option>
                                                            <option value="aus">Hawaii</option>
                                                        </select>
                                                    </div>
                                                    <input type="text" className="form-control" name="code" placeholder="Town / City" />
                                                    <input type="text" className="form-control" name="code" placeholder="ZIP" />
                                                    <ALink href="#" className="btn btn-md btn-dark btn-rounded btn-outline">Update totals</ALink>
                                                </div> */}
                                                <table className="total">
                                                    <tbody>
                                                        <tr className="summary-subtotal">
                                                            <td>
                                                                <h4 className="summary-subtitle">Total</h4>
                                                            </td>
                                                            <td>
                                                            <p className="summary-total-price ls-s">Rs.{toDecimal(getTotalPrice(cartItems) + (getTotalPrice(cartItems) <= 2000 ? 100 : 0))}</p>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <ALink href="/pages/checkout" className="btn btn-dark btn-rounded btn-checkout">Proceed to checkout</ALink>
                                            </div>
                                        </div>
                                    </aside>
                                </>
                                :
                                <div className="empty-cart text-center">
                                    <p>Your cart is currently empty.</p>
                                    <i className="cart-empty d-icon-bag"></i>
                                    <p className="return-to-shop mb-0">
                                        <ALink className="button wc-backward btn btn-dark btn-md" href="/shop/all-products">
                                            Return to shop
                                        </ALink>
                                    </p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        cartList: state.cart.data ? state.cart.data : []
    }
}

export default connect(mapStateToProps, { removeFromCart: cartActions.removeFromCart, updateCart: cartActions.updateCart })(Cart);