import React, { Component } from 'react';
import Aux from '../../../hoc/Aux_hoc/Aux_hoc';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import Summary from '../../component/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorsHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
      
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-burger-app-6a3f4.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true})
        });
    }

updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
    .map(igKey => {
        return ingredients[igKey];
    })
    .reduce((sum, el) => {
        return sum + el ;
    }, 0);
    this.setState({purchasable: sum > 0});
}


addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updateIngredients = {
        ...this.state.ingredients
    };
    updateIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    this.updatePurchaseState(updateIngredients);
};

removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
        return;
    }
    const updatedCounted = oldCount - 1;
    const updateIngredients = {
        ...this.state.ingredients
    };
    updateIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    this.updatePurchaseState(updateIngredients);
};

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice); 
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:  '?' + queryString
     });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        if (this.state.loading){
           orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        disabled = {disabledInfo}
                        ingredientsAdded = {this.addIngredientHandler}
                        ingredientsRemoved = {this.removeIngredientHandler}
                        price = {this.state.totalPrice} 
                        purchasable = {this.state.purchasable}
                        clicked = {this.purchaseHandler}
                    />
                </Aux>
           );
           orderSummary = <Summary 
            ingredients = {this.state.ingredients} 
            clickedCancel = {this.purchaseCancelHandler}
            clickedContinued = {this.purchaseContinuedHandler}
            price = {this.state.totalPrice.toFixed(2)} />;
        }
        if (this.state.loading){
            orderSummary = <Spinner />;
         }

        return (
            <Aux>
            
                <Modal show = {this.state.purchasing} cancel = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

};

export default withErrorHandler(BurgerBuilder,axios);