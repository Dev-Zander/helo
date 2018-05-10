import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import Search from './components/search';
import EditProfile from './components/editprofile';




export default(


    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/header" component={Header}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/editprofile" component={EditProfile}/>
        <Route path="/search" component={Search}/>
        {/* <Route path="/logout" component={()=>window.location = 'https://black-panther.auth0.com/v2/logout?returnTo=http://localhost:3000/#/'}/> */}
    </Switch>
)