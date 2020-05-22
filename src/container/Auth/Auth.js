import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Auth.css';
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorsHandler/withErrorHandler';
import axios from '../../axios-orders';
import {checkValidity} from '../../shared/utility';

 class Auth extends Component{
 
    state = {
        controls: {
            email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email-Address'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true,
                isEmail: true
            }
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 8
            }
        }
    },
    isSignUp: true
    } 
    
    componentDidMount = () => {
        if (!this.props.building && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirect();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthUser(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => { 
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    };

    render(){
        const formElementArray = [];
        for(let key in this.state.controls ){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });   
        }

        let form = formElementArray.map(formElement => (
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
           
        ) );
            if (this.props.loading) {
                form = <Spinner />
            }

            let message = null;

            if (this.props.error) {
                message = (
                <p>{this.props.error.message}</p>)
            }

            let authRedirect = null;

            if (this.props.isAuthenticated) {
                authRedirect = (
                <Redirect to = {this.props.authRedirect} />)
            }
        return(
            <div className = {classes.Auth}>
                {authRedirect}
                {message}
                <form onSubmit = { this.submitHandler}>
                {form}    
                <Button btnType= "Success" >SUBMIT</Button> 
                </form>

                <Button btnType = "Danger" clicked = {this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        );
    }
 }

 const mapsStateToProps = state => {
    return {
         loading: state.auth.loading,
         error: state.auth.error,
         isAuthenticated: state.auth.token !== null,
         building: state.builder.building,
         authRedirect: state.auth.authRedirect
        }
 };

const mapsDispatchToProps = dispatch => {
   return { 
       onAuthUser: (email, password,isSignUp) => dispatch(actionCreators.authUser(email, password,isSignUp)),
       onSetAuthRedirect: () => dispatch(actionCreators.setAuthRedirect('/'))
    }
}; 

 export default connect(mapsStateToProps,mapsDispatchToProps)(withErrorHandler(Auth,axios));