import React, { Component } from 'react';
import {Route, withRouter,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from '../container/Checkout/Checkout';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';
import * as actionCreators from '../store/actions/index';

class App extends Component {
  componentDidMount= ()=> {
    this.props.onTryAutoSignup();
  }
  render() {

    let routes =(
      <Switch>
        <Route path = "/auth" component = {Auth} />
        <Route path = "/" exact component = {BurgerBuilder} />
        <Redirect to = "/" />
      </Switch>
    );

    if (this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path = "/checkout" component = {Checkout} />
          <Route path = "/orders" component = {Orders} />
          <Route path = "/logout" component = {Logout} />
          <Route path = "/" exact component = {BurgerBuilder} />
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