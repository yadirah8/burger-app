import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient =  (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
        };
};

export const removeIngredient =  (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
        };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngFailed = () => {
    return {
        type: actionTypes.FETCH_INGFAILED
    };
};

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-burger-app-6a3f4.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
            console.log(response)
        })
        .catch(error => {
            dispatch(fetchIngFailed());
        });
    };
};