import React, {Component} from 'react';
import {connect} from 'react-redux';
import withUnmounted from '@ishawnwang/withunmounted';

import Order from '../../component/Order/Order';
import axios from '../../axios-orders';
import withErrorsHandler from '../../hoc/withErrorsHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Orders extends Component {
    hasUnmounted = false;
    componentDidMount(){
        if (this.hasUnmounted) {
            // check hasUnmounted flag
            return;
          }
        this.props.onOrdersBurger(this.props.token, this.props.userId);
    };
    
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
           orders = <div>
              { this.props.orders.map(order => (
                <Order
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price}/>
                    ))}
           </div>
               };
    return orders;
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onOrdersBurger: (token, userId) => dispatch(actionCreators.ordersBurger(token, userId))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withUnmounted(withErrorsHandler(Orders,axios)));