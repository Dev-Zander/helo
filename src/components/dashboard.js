import React, { Component } from 'react';
import Header from '../components/header';
import Profile from "../components/profile";

class Dashboard extends Component {
    render() {
        return (

            <div>
                <Header/>
                <Profile/>
            </div>

        )
}
}


export default Dashboard
