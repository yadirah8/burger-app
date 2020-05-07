import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    //changes state object to array
    let transformedIngredient = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_ , i) => {
            return <BurgerIngredient key = {igKey + i} type = {igKey} />;
        });
    })
    .reduce((prevValue , currentValue) => {
        return prevValue.concat(currentValue)
    }, []);
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients!</p>
    }
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top" />
           {transformedIngredient}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    );
};

export default burger;