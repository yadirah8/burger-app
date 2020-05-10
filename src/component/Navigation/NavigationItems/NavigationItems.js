import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link = "/" exact >Burger Build</NavigationItem>
        <NavigationItem link = "/orders">Orders</NavigationItem>
    </ul>
);

export default navItems;