import React, { Component } from 'react';
import Layout from './Layout/Layout';
import {BrowserRouter,Route} from 'react-router-dom';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from '../container/Checkout/Checkout';
import Orders from './Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
          <Route path = "/checkout" component = {Checkout} />
          <Route path = "/orders" exact component = {Orders} />
          <Route path = "/" exact component = {BurgerBuilder} />
          </Layout>
       </BrowserRouter>
        
      </div>
      
    );
  }
}

export default App;