require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0')
const massive = require('massive');
const bodyParser = require('body-parser');
const checkForSession = require('../server/middlewares/checkForSessions');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const friendsController = require('./controllers/friendsController');


const{
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
}=process.env


const app = express();

//app.use(express.static(`${__dirname}/../build`));


massive(CONNECTION_STRING).then(db =>{
    app.set('db', db)
})

app.use(bodyParser.json())

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:300000,
    }
}))


app.use(checkForSession)

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email profile'
},

function (accessToken, refreashToken, extraParams, profile, done ){
    const db = app.get('db')
    db.find_user([profile.id]).then(users => {
        console.log(users)
        if(!users[0]){
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
              }
              randomNum = getRandomInt(5098);
            let userphoto = `https://robohash.org/${randomNum}`
            db.create_user([profile.displayName, profile.id,userphoto]).then(res =>{
                return done(null, res[0].auth_id)
            })
        }else {
            return done(null, users[0].auth_id)
        }
    })
}
))

passport.serializeUser((id,done)=>{
    return done(null, id)
})

passport.deserializeUser((id,done)=>{

    app.get('db').find_user([id]).then(res =>{
        return done(null, res[0])
    })
})

app.get('/auth',passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `${process.env.HOMEPAGE}#/dashboard`,
    failureRedirect: `${process.env.HOMEPAGE}`
}))

app.get('/api/getFriends', friendsController.getFriends)

app.get('/api/destroy', loginController.destroy)

app.get('/api/getuserinfo', userController.getUser)

app.get('/api/getallusers', userController.getAllUsers)

app.put('/api/updateProfile', userController.updateUser)

app.post('/api/addfriend', friendsController.addFriend)

app.post('/api/removefriend', friendsController.removeFriend)

app.get('/api/alluserprofiles', userController.getProfiles)

app.listen(SERVER_PORT, ()=> console.log(`I hear dead people on port: ${SERVER_PORT}.`))