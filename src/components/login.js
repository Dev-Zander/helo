import React, { Component } from 'react';
import '../style.css'
import logo from '../assets/logo.png';





class Login extends Component {
    render() {
        return (

            <div className="login-main">
                <div className="login-box">
                    <div className="login-logo">
                    <img className="login-logo" alt="logo" src={logo}/>
                        <div className="login-title">
                            Helo
                            <a href={process.env.REACT_APP_LOGIN} className="login-button"><div className="button-text">Login / Register</div></a>         
                        </div>
                    </div>
                
                </div>
            </div>

        )
}
}


export default Login