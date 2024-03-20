import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';

import { toDecimal, getTotalPrice } from '~/utils';

function Order( props ) {
    const { cartList } = props;

    return (
        <main className="main order">
            <Helmet>
                <title>Party Shope Web Store | Order</title>
            </Helmet>

            <h1 className="d-none">Party Shope Web Store - Order</h1>

            <div className="page-content pt-7 pb-10 mb-10">
                <div className="step-by pr-4 pl-4">
                    <h3 className="title title-simple title-step"><ALink href="/pages/cart">1. Shopping Cart</ALink></h3>
                    <h3 className="title title-simple title-step"><ALink href="/pages/checkout">2. Checkout</ALink></h3>
                    <h3 className="title title-simple title-step active"><ALink href="#">3. Order Complete</ALink></h3>
                </div>
                <div className="container mt-8">
                    <div className="order-message mr-auto ml-auto">
                        <div className="icon-box d-inline-flex align-items-center">
                            <div className="icon-box-icon mb-0">
                               <svg width="800px" height="800px" fill='#2266CC' viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><path class="cls-1" d="M47.91,53.91a5.93,5.93,0,0,1-4.24-1.76l-4.32-4.32A2,2,0,0,1,42.17,45l4.33,4.32a2,2,0,0,0,2.82,0,2,2,0,0,0,0-2.82L36.24,33.41a2,2,0,0,1,0-2.82L49.32,17.5a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0L33.41,27.76a2,2,0,0,1-2.82,0L17.5,14.68a2,2,0,0,0-2.82,0,2,2,0,0,0,0,2.82L27.76,30.59a2,2,0,0,1,0,2.82L14.68,46.5a2,2,0,0,0,0,2.82,2,2,0,0,0,2.82,0L30.59,36.24a2,2,0,0,1,2.82,0l2.44,2.44A2,2,0,0,1,33,41.51l-1-1L20.33,52.15a6,6,0,1,1-8.48-8.48L23.51,32,11.85,20.33a6,6,0,1,1,8.48-8.48L32,23.51,43.67,11.85a6,6,0,1,1,8.48,8.48L40.49,32,52.15,43.67a6,6,0,0,1-4.24,10.24Z"/></svg>
                            </div>
                            <div className="icon-box-content text-left">
                                <h5 className="icon-box-title font-weight-bold lh-1 mb-1">Place Order First!</h5>
                                {/* <p className="lh-1 ls-m">Please Place your order</p> */}
                            </div>
                        </div>
                    </div>


                    {/* <div className="order-results">
                        <div className="overview-item">
                            <span>Order number:</span>
                            <strong>4935</strong>
                        </div>
                        <div className="overview-item">
                            <span>Status:</span>
                            <strong>Processing</strong>
                        </div>
                        <div className="overview-item">
                            <span>Date:</span>
                            <strong>November 20, 2020</strong>
                        </div>
                        <div className="overview-item">
                            <span>Email:</span>
                            <strong>12345@gmail.com</strong>
                        </div>
                        <div className="overview-item">
                            <span>Total:</span>
                            <strong>${ toDecimal( getTotalPrice( cartList ) ) }</strong>
                        </div>
                        <div className="overview-item">
                            <span>Payment method:</span>
                            <strong>Cash on delivery</strong>
                        </div>
                    </div>

                    <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">Order Details</h2>
                    <div className="order-details">
                        <table className="order-details-table">
                            <thead>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h3 className="summary-subtitle">Product</h3>
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartList.map( item =>
                                        <tr key={ 'order-' + item.name }>
                                            <td className="product-name">{ item.name } <span> <i className="fas fa-times"></i> { item.qty }</span></td>
                                            <td className="product-price">${ toDecimal( item.qty * item.price ) }</td>
                                        </tr>
                                    ) }
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Subtotal:</h4>
                                    </td>
                                    <td className="summary-subtotal-price">${ toDecimal( getTotalPrice( cartList ) ) }</td>
                                </tr>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Shipping:</h4>
                                    </td>
                                    <td className="summary-subtotal-price">Free shipping</td>
                                </tr>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Payment method:</h4>
                                    </td>
                                    <td className="summary-subtotal-price">Cash on delivery</td>
                                </tr>
                                <tr className="summary-subtotal">
                                    <td>
                                        <h4 className="summary-subtitle">Total:</h4>
                                    </td>
                                    <td>
                                        <p className="summary-total-price">${ toDecimal( getTotalPrice( cartList ) ) }</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className="title title-simple text-left pt-10 mb-2">Billing Address</h2>
                    <div className="address-info pb-8 mb-6">
                        <p className="address-detail pb-2">
                            John Doe<br />
                        Party Company<br />
                        Steven street<br />
                        El Carjon, CA 92020<br />
                        123456789
                    </p>
                        <p className="email">mail@party.com</p> */}
                    {/* </div> */}

                    <ALink href="/shop" className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"><i className="d-icon-arrow-left"></i> Back to List</ALink>
                </div>
            </div>
        </main>
    )
}

function mapStateToProps( state ) {
    return {
        cartList: state.cart.data ? state.cart.data : []
    }
}

export default connect( mapStateToProps )( Order );
