/**
 * Created by pawan on 12/3/17.
 */

const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

const routes = {
    notLoggedInUser: require('./notLoggedInUser'),
    user: require('./user'),
    contribute: require('./contribute'),
}
route.use('/notLoggedInUser', routes.notLoggedInUser);

function checkUser(req, res) {
    if(req['user']){
        console.log("User authenticated at " + route.baseUrl);
        next();
    }
    else{
        console.log("User NOT authenticated at " + route.baseUrl);
        res.redirect('/login.html')
    }
}
route.use(checkUser);

route.use('/user', routes.user);
route.use('/contribute', routes.contribute);


module.exports = route;