import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux_hoc/Aux_hoc';

const sideDrawer = (props) => {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClass = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux> 
            <BackDrop show= {props.open} cancel = {props.closed}/>
            <div className = {attachedClass.join(' ')}  onClick = {props.closed}>
                <div className = {classes.Logo}>
                    <Logo  />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth} />
                </nav>
            </div>
        </Aux>
       )
};

export default sideDrawer;