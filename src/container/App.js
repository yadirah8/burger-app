import React, { Component } from 'react';
import {Route, withRouter,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from  '../hoc/async/async';

import Layout from './Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Logout from './Auth/Logout/Logout';
import * as actionCreators from '../store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./Auth/Auth');
})

class App extends Component {
  componentDidMount= ()=> {
    this.props.onTryAutoSignup();
  }
  render() {

    let routes =(
      <Switch>
        <Route path = "/auth" component = {asyncAuth} />
        <Route path = "/"  component = {BurgerBuilder} />
        <Redirect to = "/" />
      </Switch>
    );

    if (this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path = "/checkout" component = {asyncCheckout} />
          <Route path = "/orders" component = {asyncOrders} />
          <Route path = "/logout" component = {Logout} />
          <Route path = "/auth" component = {asyncAuth} />
          <Route path = "/" component = {BurgerBuilder} />
          <Redirect to = "/" />
        </Switch>  
      );
    }
    return (
      <div>
          <Layout>
            {routes}
          </Layout>
      </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));