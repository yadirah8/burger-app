import React,{Component} from 'react';
import Modal from '../../component/UI/Modal/Modal';
import Aux from '../../hoc/Aux_hoc/Aux_hoc';


const withErrorHandler = (WrapperComponent, axios) => {
        return class extends Component {
            state = {
                error: null,
                message: 'Network Error'
            }
            UNSAFE_componentWillMount (){
                axios.interceptors.request.use(req => {
                    this.setState({error: null });
                    return req;
                })
                 axios.interceptors.response.use(res => res,
                     error => {
                    this.setState({error:error});
                })
            }

            //  componentWillUnmount() {
            //      axios.interceptors.request.eject(this.reqInter);
            //      axios.interceptors.request.eject(this.resInter);
            //  }

            errorConfirmedHandler = () => {
                this.setState({error: null });
            }
            render(){
                return(
                    <Aux>
                        <Modal 
                        show = {this.state.error} 
                        clicked = {this.errorConfirmedHandler}>
                            {this.state.error ? this.state.message : null}
                        </Modal>
                        <WrapperComponent {...this.props}/>
                    </Aux> 
                 )
            }

        } ;
} 

export default withErrorHandler;