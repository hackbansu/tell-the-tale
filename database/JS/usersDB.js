/**
 * Created by pawan on 12/3/17.
 */
//CRUD Operations on users database

const database = require('./database');
var myDb = database.myDb;

function getAllUsers(done) {                                                //get all users
    myDb.collection("users").find({}).toArray(function (err, data) {
        if (err) throw err;
        // console.log("log after getting all users", data);
        done(data);
    })
}

function getUser(email, password, done) {                                          //get a user
    myDb.collection("users").findOne({email: email, password: password}, {email: 1, firstName: 1 }, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

function getUserById(_id, done) {                                          //get a user
    myDb.collection("users").findOne({_id: _id}, {password: 0, contributions: 0}, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

function userExists(email, done) {                                         //Does user Exists?
    myDb.collection("users").findOne({email: email}, {_id: 1}, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

function insertNewUser(user, done) {                                     //insert new user
    myDb.collection("users").insertOne(user, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

function updateUser(userId, updates, done) {                                       //update a user
    myDb.collection("users").updateOne({_id: ObjectID(userId)}, {$set: updates}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

function removeUser(_id, done) {                                       //remove a user
    myDb.collection("users").findOneAndDelete({_id: _id}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

//exporting user stuff
module.exports = {
    getAllUsers,
    getUser,
    getUserById,
    userExists,
    insertNewUser,
    updateUser,
    removeUser,
}