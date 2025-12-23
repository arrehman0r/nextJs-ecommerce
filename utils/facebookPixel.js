/**
 * Facebook Pixel Tracking Utility
 * Handles all Facebook Pixel events
 */

/**
 * Trigger AddToCart event on Facebook Pixel
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity added to cart
 */
export const triggerFacebookPixelAddToCartEvent = (product, quantity = 1) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'AddToCart', {
            content_name: product.name,
            content_ids: [String(product.id)],
            content_type: 'product',
            value: parseFloat(product.price || product.sale_price || 0) * quantity,
            currency: 'PKR', // Your currency
            quantity: quantity,
        });
    }
};

/**
 * Trigger Purchase event on Facebook Pixel
 * @param {Array} cartList - List of products in cart
 * @param {number} totalValue - Total order value
 * @param {string} orderId - Order ID
 */
export const triggerFacebookPixelPurchaseEvent = (cartList, totalValue, orderId) => {
    if (typeof window !== 'undefined' && window.fbq) {
        const contentIds = cartList.map(item => String(item.id));
        const contentNames = cartList.map(item => item.name);

        window.fbq('track', 'Purchase', {
            content_ids: contentIds,
            content_names: contentNames,
            content_type: 'product',
            value: parseFloat(totalValue),
            currency: 'PKR',
            num_items: cartList.length,
            order_id: orderId,
        });
    }
};

/**
 * Trigger ViewContent event on Facebook Pixel
 * Only fires on product detail pages
 * @param {Object} product - Product object
 */
export const triggerFacebookPixelViewContentEvent = (product) => {
    if (typeof window !== 'undefined' && window.fbq) {

        window.fbq('track', 'ViewContent', {
            content_ids: [String(product.id)],
            content_name: product.name,
            content_type: 'product',
            value: parseFloat(product.price || product.sale_price || 0),
            currency: 'PKR',
        });
    }
};

/**
 * Trigger InitiateCheckout event on Facebook Pixel
 * @param {Array} cartList - List of products in cart
 * @param {number} totalValue - Total cart value
 */
export const triggerFacebookPixelInitiateCheckoutEvent = (cartList, totalValue) => {
    if (typeof window !== 'undefined' && window.fbq) {
        const contentIds = cartList.map(item => String(item.id));

        window.fbq('track', 'InitiateCheckout', {
            content_ids: contentIds,
            content_type: 'product',
            num_items: cartList.length,
            value: parseFloat(totalValue),
            currency: 'PKR',
        });
    }
};
