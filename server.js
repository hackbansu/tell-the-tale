/**
 * Created by pawan on 7/3/17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const passportLocal = require('passport-local')
const session = require('express-session')
const path = require('path');
const database = require('./database/JS/database')

const LocalStrategy = passportLocal.Strategy;

const routes = {
    users: require('./routes/users/users.js')
}

const app = express();

passport.use(new LocalStrategy(function (email, pass, done) {
    console.log("Checking credentials");

    database.users.getUser(email, pass, function (result) {
        if (!result) {
            database.users.userExists(email, function (nextResult) {
                if (!nextResult) {
                    console.log("No user found");
                    done(null, false, {message: "No such user"})
                }
                else {
                    console.log("wrong Password");
                    done(null, false, {message: "wrong Password"})
                }
            })
        }
        else {
            console.log("SUCCESS");
            done(null, result, {message: "SUCCESS"})
        }
    })
}));

passport.serializeUser(function (user, done) {
    return done(null, user._id);
})
passport.deserializeUser(function (_id, done) {
    database.users.getUserById(_id, function (user) {
        return done(null, user);
    })
})

app.use('/', express.static(path.join(__dirname, "public_html")));
app.use('/', express.static(path.join(__dirname, "public_html", "mainPage")));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "tale secret key",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())

//Handling users related requests
app.use('/users', routes.users);



database.init(function () {
    app.listen(3333, function () {
        console.log("server started at 3333");
    })
    database.users.getAllUsers(function (result) {
        console.log(result);
    })
})
