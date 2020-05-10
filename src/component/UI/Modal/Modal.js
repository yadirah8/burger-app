import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux_hoc/Aux_hoc';
import Backdrop from '../BackDrop/BackDrop';

class Modal  extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    UNSAFE_componentWillUpdate () {
        console.log ('[Modal] WillUpdate');
    }
    render(){
        return(
            <Aux>
        <Backdrop show = {this.props.show} cancel = {this.props.cancel}/>
        <div className = {classes.Modal} 
            style = {{
                transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                opacity: this.props.show ? '1' : '0'
            }}>
        {this.props.children}
    </div>
    </Aux>
        )
    }
};

export default Modal;