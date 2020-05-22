import React, { Component } from 'react';
import {connect} from 'react-redux';
import withUnmounted from '@ishawnwang/withunmounted';

import Aux from '../../hoc/Aux_hoc/Aux_hoc';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import Summary from '../../component/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorsHandler/withErrorHandler';


export class BurgerBuilder extends Component {
     hasUnmounted = false;
    state = { 
      purchasing: false  
    }

componentDidMount() {
    if (this.hasUnmounted) {
        // check hasUnmounted flag
        return 
      } 
      this.props.onInitIngredient();   
    }

updatePurchaseState (ingredients) {
    const sum = Object.keys(this.props.ing)
    .map(igKey => {
        return ingredients[igKey];
    })
    .reduce((sum, el) => {
        return sum + el ;
    }, 0);
    return sum > 0;
}

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push( '/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ing
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        console.log(this.props.ing);

        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ing}/>
                    <BuildControls 
                        disabled = {disabledInfo}
                        ingredientsAdded = {this.props.onIngredientsAdded}
                        ingredientsRemoved = {this.props.onIngredientsRemoved }
                        price = {this.props.price} 
                        purchasable = {this.updatePurchaseState(this.props.ing)}
                        clicked = {this.purchaseHandler}
                        isAuth = {this.props.isAuthenticated}
                    />
                </Aux>
            );
           orderSummary = <Summary 
            ingredients = {this.props.ing} 
            clickedCancel = {this.purchaseCancelHandler}
            clickedContinued = {this.purchaseContinuedHandler}
            price = {this.props.price} />;
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
const mapStateToProps = state => {
    return {
        ing: state.builder.ingredients,
        price: state.builder.totalPrice,
        error: state.builder.error,
        isAuthenticated: state.auth.token !== null
        
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actionCreators.initIngredient()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actionCreators.setAuthRedirect(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withUnmounted(withErrorHandler(BurgerBuilder,axios)));