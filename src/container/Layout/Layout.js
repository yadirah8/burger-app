import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
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
                <Toolbar drawerToggle = {this.sideDrawerToggleHandler}/>
                <SideDrawer closed = {this.sideDrawHideHandler} open = {this.state.visibleside}/>
            <main className= {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
};

export default Layout;