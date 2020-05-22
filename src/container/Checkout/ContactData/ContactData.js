import React , {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorsHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 8
                    }
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                    }
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6,
                        maxLength: 6
                    }
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                    }
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'someone@example.com'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                    }
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validation: {},
                    valid: true,
                    value: 'fastest'
                    }
        },
    
        formIsValid: false 
    }  

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; 
        }
       const order = {
           ingredients : this.props.ing,
           price: this.props.price,
           orderData: formData,
           userId: this.props.userId
    }
        this.props.orderBurger(order, this.props.token)

    }
    
    checkValidity(value,rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.touched = true;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm ){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });   
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key = {formElement.id} 
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        valueType = {formElement.config.elementConfig.placeholder}
                        changed = {(event) => this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType = "Success" disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading){
            form = <Spinner />;
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}; 

const mapStateToProps = state => {
    return{
    ing: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    usedId: state.auth.userId
}
};

const mapDispatchToProps = dispatch => {
    return {
        orderBurger:(orderData, token) => dispatch(actionCreators.purchaseBurger(orderData,token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));