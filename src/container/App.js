import React, { Component } from 'react';
import Layout from './Layout/Layout';
//import Aux from '../../src/hoc/Aux';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <BurgerBuilder/>
      </Layout>
      </div>
      
    );
  }
}

export default App;