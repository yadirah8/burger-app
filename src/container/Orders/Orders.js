import React, {Component} from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-orders';
import withErrorsHandler from '../../hoc/withErrorsHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            const fetch = [];
            for (let key in res.data){
                fetch.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetch});
        })
        .catch(err => {
            this.setState({loading: false});
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                     key = {order.id}
                     ingredients = {order.ingredients}
                     price = {order.price}
                     />
                ))}
            </div>
        );
    }
}

export default withErrorsHandler(Orders,axios);