import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import houselogo from '../assets/home.png';
import searchlogo from '../assets/search.png';

class Header extends Component {

    render() {
        return (

            <div className="header">

                <div className="title-container">
                    <div className="logo-container">
                    Helo
                    <Link to='/dashboard'><img className="house-logo" alt="Home Icon" src={houselogo} /></Link>
                    <Link to='/search'> <img className="house-logo" alt="Home Icon" src={searchlogo} /></Link>
                </div>
                <div className="page-title">
                    Search
            <div className="logout-box">
                        <a href={'http://localhost:3210/api/destroy'} className="logout-text">

                            Logout
            </a>

                    </div>


                </div>


            </div>
             
            </div >

        )
    }
}


export default withRouter(Header)

