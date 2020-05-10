import React,{Component} from 'react';
import Aux from '../../hoc/Aux_hoc/Aux_hoc';
import Button from '../../component/UI/Button/Button';

class Summary extends Component {
    UNSAFE_componentWillUpdate() {
        console.log('[Summary] WillUpdate');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return( 
            <li key = {igKey}>
                <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
            );
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious Burger with:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType = "Danger" clicked = {this.props.clickedCancel}>Cancel</Button>
                <Button btnType = "Success" clicked = {this.props.clickedContinued}>Continue</Button>
            </Aux>
    );
    }
};


export default Summary;