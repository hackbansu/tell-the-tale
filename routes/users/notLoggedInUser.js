/**
 * Created by pawan on 12/3/17.
 */

const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

//req.body = {email,password,firstName,lastName,contactNumber}
route.post('/addNewUser', function (req, res) {
    let user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        contributions: {},
        votes: {},
    };

    db.users.insertNewUser(user, function (data) {
        // console.log(data.ops);
        res.send(data);
    })
})

//req.query = {email}
route.get('/doesUserExists', function (req, res) {
    db.users.findInUsers({email: req.query.email}, function (result) {
        // console.log(result);
        if (result) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    })
})

module.exports = route;