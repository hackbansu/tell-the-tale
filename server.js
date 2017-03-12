/**
 * Created by pawan on 7/3/17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Handling users related requests
app.post('/user/addNewUser', function (req, res) {
    let user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        contributions: {},
    };

    db.insertNewUser(user, function (result) {
        res.send(result);
    })
})

app.post('/user/doesUserExists', function (req, res) {
    db.userExists(req.body.email, function (result) {
        if (result) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    })
})

app.post('/user/removeUser', function (req, res) {
    db.removeUser(req.body.email, function (result) {
        if(result.value){
            res.json(true);
        }
        else{
            res.json(false);
        }
    })
})

app.use('/', express.static(path.join(__dirname, "public_html")));
app.use('/', express.static(path.join(__dirname, "public_html", "mainPage")));

db.init(function () {
    app.listen(3333, function () {
        console.log("server started at 3333");
    })
    db.getAllUsers(function (result) {
        console.log(result);
    })
})
