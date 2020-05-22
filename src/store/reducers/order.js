import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state,action) => {
    return updateObject(state,{purchased: false});
};
const purchaseStart = (state,action) => {
    return updateObject(state,{loading: true});
};
const purchaseSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId});
    const updateSta = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder) 
    };
    return updateObject(state, updateSta);
};
const purchaseFailed = (state,action) => {
    return updateObject(state, {loading: false});
};
const orderStart = (state,action) => {
    return updateObject(state, {loading: true});
};
const orderSuccess = (state,action) => {
    return updateObject(state, {orders: action.orders,loading: false});
};
const orderFailed = (state,action) => {
    return updateObject(state, {loading: false});
};


const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state , action);
        case actionTypes.PURCHASE_START: return purchaseStart(state , action);
        case actionTypes.PURCHASE_SUCCESS : return purchaseSuccess(state , action);
        case actionTypes.PURCHASE_FAILED : return purchaseFailed(state , action);
        case actionTypes.ORDERS_START: return orderStart(state , action);
        case actionTypes.ORDERS_SUCCESS: return orderSuccess(state , action);
        case actionTypes.ORDERS_FAILED: return orderFailed(state , action);
        default: 
        return state;
    }
};

export default reducer;