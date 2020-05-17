import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux_hoc/Aux_hoc';
import classes from './Layout.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        visibleside : false,
    }

    sideDrawHideHandler = () => {
        this.setState ({visibleside : false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {visibleside: !prevState.visibleside}});
    };

    render (){
        return (
            <Aux>
                <Toolbar 
                isAuth = {this.props.isAuthenticated} drawerToggle = {this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth = {this.props.isAuthenticated} closed = {this.sideDrawHideHandler} open = {this.state.visibleside}/>
            <main className= {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
};

const mapsStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapsStateToProps)(Layout);