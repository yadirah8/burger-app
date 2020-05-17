import React, {Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {

    UNSAFE_componentWillMount() {
        this.props.onPurchaseInit();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }

    render(){
        let summary = <Redirect to= "/" />
        if (this.props.ing) {
            const purchaseRedirect = this.props.purchased ? <Redirect to = "/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                    checkoutCancelled = {this.checkoutCancelledHandler} 
                    checkoutContinued = {this.checkoutContinuedHandler}
                    ingredients={this.props.ing}/>
                    <Route path = {this.props.match.path + '/contact-data'} component = {ContactData} />
                </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return{
        ing: state.builder.ingredients,
        purchased: state.order.purchased
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit:() => dispatch(actionCreators.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);