import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { useImperativeHandle } from 'react';

export const purchaseSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseFailed = (error) => {
    return{
        type: actionTypes.PURCHASE_FAILED,
        error: error
    };
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json?auth=' + token,orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseSuccess(response.data, orderData))
        } )
        .catch(error => {
            dispatch(purchaseFailed(error));
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const ordersStart = () => {
    return{
        type: actionTypes.ORDERS_START
    };
};

export const ordersSuccess = (orders) => {
    return{
        type: actionTypes.ORDERS_SUCCESS,
        orders: orders
    };
};
export const ordersFailed = (error) => {
    return{
        type: actionTypes.ORDERS_FAILED,
        error: error
    };
};
export const ordersBurger = (token, userId) => {
    return dispatch => {
        dispatch(ordersStart());
        const queryParams = '?auth' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetch = [];
            for (let key in res.data){
                fetch.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(ordersSuccess(fetch));
        })
        .catch(err => {
            dispatch(ordersFailed(err));
        });
    };
};