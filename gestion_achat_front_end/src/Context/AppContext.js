import React, {Component} from "react";

import { Bounce, ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AppContext = React.createContext();

export class AppContextProvider extends Component {
    state = {
        isconnected: false,
        menu:"",
    }

    componentDidMount = () => {
        let x = window.localStorage.getItem("isConnected")
        if (x) {
            this.setState({isconnected:true});
        } else {
            this.setState({isconnected:false});
        }
    }

    changeMenu = (menu)=>{
        this.setState({menu:menu});
    }

    logIn = (data) =>{
        console.log(data)
        if (data.email ==="group2" && data.password ==="group2") {
            window.localStorage.setItem("isConnected",JSON.stringify(data))
            this.setState({isconnected:true});
        } else {
            toast.error('Verifier vos identifiant de connexion', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            
        }
    }

    logOut = () =>{
        window.localStorage.removeItem("isConnected")
        this.setState({isconnected:false});
        window.location.href = '/gestionachats';
    }

    render() {
        const {isconnected,menu} = this.state
        const {logIn,logOut,changeMenu} = this;
        return (
             <AppContext.Provider value={{isconnected,menu,logIn,logOut,changeMenu}}>
                {this.props.children}
                <ToastContainer></ToastContainer>
             </AppContext.Provider>
        );
    }
}

export default AppContext;