/**
 * Created by pawan on 12/3/17.
 */

const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

const routes = {
    noLoginUsers: require('./noLoginUsers'),
}
route.use('/noLoginUsers', routes.noLoginUsers);

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

route.post('/removeUser', function (req, res) {
    db.users.removeUser(req['user']._id, function (result) {
        console.log(result);
        if(result.value){
            res.json(true);
        }
        else{
            res.json(false);
        }
    })
})


module.exports = route;