import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';

import CartPopup from '~/components/features/product/common/cart-popup';
import { triggerFacebookPixelAddToCartEvent } from '~/utils/facebookPixel';

const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART: 'UPDATE_CART',
    REFRESH_STORE: 'REFRESH_STORE'
}

const initialState = {
    data: []
}

function cartReducer( state = initialState, action ) {
    switch ( action.type ) {
        case actionTypes.ADD_TO_CART:
            let tmpProduct = { ...action.payload.product };
            
            // Create unique cart item key using product ID and variation ID
            const getCartItemKey = (item) => {
                return item.variation_id 
                    ? `${item.id}-${item.variation_id}` 
                    : `${item.id}`;
            };
            
            const newItemKey = getCartItemKey(tmpProduct);
            const existingIndex = state.data.findIndex(item => getCartItemKey(item) === newItemKey);

            if ( existingIndex > -1 ) {
                let tmpData = state.data.map((cur, index) => {
                    if ( index === existingIndex ) {
                        return {
                            ...cur,
                            qty: parseInt( cur.qty ) + parseInt( tmpProduct.qty )
                        };
                    }
                    return cur;
                });

                return { ...state, data: tmpData };
            } else {
                return { ...state, data: [ ...state.data, tmpProduct ] };
            }

        case actionTypes.REMOVE_FROM_CART:
            const removeItemKey = action.payload.product.variation_id 
                ? `${action.payload.product.id}-${action.payload.product.variation_id}`
                : `${action.payload.product.id}`;
            
            let cart = state.data.filter(product => {
                const itemKey = product.variation_id 
                    ? `${product.id}-${product.variation_id}`
                    : `${product.id}`;
                return itemKey !== removeItemKey;
            });

            return { ...state, data: cart };

        case actionTypes.UPDATE_CART:
            return { ...state, data: action.payload.products };

        case actionTypes.REFRESH_STORE:
            return initialState;

        default:
            return state;
    }
}

export const cartActions = {
    addToCart: product => ( { type: actionTypes.ADD_TO_CART, payload: { product } } ),
    removeFromCart: product => ( { type: actionTypes.REMOVE_FROM_CART, payload: { product } } ),
    updateCart: products => ( { type: actionTypes.UPDATE_CART, payload: { products } } )
};

export function* cartSaga() {
    yield takeEvery( actionTypes.ADD_TO_CART, function* saga( e ) {
        // Trigger Facebook Pixel AddToCart event
        triggerFacebookPixelAddToCartEvent(e.payload.product, e.payload.product.qty);
        
        toast( <CartPopup product={ e.payload.product } /> );
    } )
}

const persistConfig = {
    keyPrefix: "party-",
    key: "cart",
    storage
}

export default persistReducer( persistConfig, cartReducer );