/**
 * Created by pawan on 12/3/17.
 */

const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

route.post('/addNewUser', function (req, res) {
    let user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        contributions: {},
    };

    db.users.insertNewUser(user, function (data) {
        console.log(data);
        res.send(data);
    })
})

route.post('/doesUserExists', function (req, res) {
    db.users.userExists(req.body.email, function (result) {
        console.log(result);
        if (result) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    })
})

module.exports = route;