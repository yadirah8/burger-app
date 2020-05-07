import React from 'react';
import classes from './BackDrop.css';

const backdrop = (props) => (
        props.show? <div  onClick = {props.cancel} className = {classes.Backdrop}></div> : null
);

export default backdrop;