/**
 * Created by pawan on 13/3/17.
 */
const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

//req.body = {things to update}
route.post('/updateUser', function (req, res) {
    db.users.updateUser(req['user']._id, {$set: req.body}, function (result) {
        console.log(result);
        if(result.matchedCount){
            res.json(true);
        }
        else{
            res.json(false);
        }
    })
})

//req.query = {empty}
route.get('/removeUser', function (req, res) {
    db.users.removeUser(req['user']._id, function (result) {
        // console.log(result);
        if(result.value){
            res.json(true);
        }
        else{
            res.json(false);
        }
    })
})

module.exports = route;