/**
 * Created by pawan on 12/3/17.
 */
//CRUD Operations on users database

const database = require('./database');
var myDb = database.myDb;
var ObjectId = require('mongodb').ObjectId;

//get all users return all info [{_id: ...},{}]
function getAllUsers(done) {
    myDb.collection("users").find({}).toArray(function (err, data) {
        if (err) throw err;
        // console.log("log after getting all users", data);
        done(data);
    })
}

//get user via email, password return {email: ..., firstname: ...}
function getUser(email, password, done) {
    myDb.collection("users").findOne({email: email, password: password}, {
        email: 1,
        firstName: 1
    }, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

//get user by id return all except password and contributions {_id: ...}
function getUserById(_id, done) {
    myDb.collection("users").findOne({_id: ObjectId(_id)}, {password: 0, contributions: 0}, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

//get users details that satisfy toFind and return in the form [{_id: ...},{}]
function findInUsers(toFind, toGet, skip, batchSize, limit, done) {
    if(typeof toFind['_id'] == "string"){
        toFind['_id'] = ObjectId(toFind['_id']);
    }
    let cursor = myDb.collection("users").find(toFind);
    cursor.project(toGet);
    cursor.skip(skip);
    cursor.batchSize(batchSize);
    cursor.limit(limit);
    cursor.toArray(function (err, data) {
        // console.log(data);
        done(data);
    })
}

//get required user details that satisfy toFind and return in the form {id: ...}
function findOneInUsers(toFind, toGet, done) {
    if(typeof toFind['_id'] == "string"){
        toFind['_id'] = ObjectId(toFind['_id']);
    }
    myDb.collection("users").findOne(toFind, toGet, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

//insert a new user to the collection and return {ops: [{_id: ...}]}
function insertNewUser(user, done) {
    myDb.collection("users").insertOne(user, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

//update user info via id return all info {value:{_id: ...}} except contributions, upvotes, password
function updateUser(_id, updates, done) {
    myDb.collection("users").findOneAndUpdate({_id: ObjectId(_id)}, updates, {
        projection: {
            contributions: 0,
            upvotes: 0,
            password: 0
        }
    }, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

//remove the user via id and return all info {value:{_id: ...}}
function removeUser(_id, done) {
    myDb.collection("users").findOneAndDelete({_id: ObjectId(_id)}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

//check for the contribution and return id if exists
// function checkContributionByUser(_id, contribution, obj, done) {
//     if(contribution == "snippetExists"){
//         let storyStageField = ("contributions." + obj.storyName +"."  + obj.stage);
//         retval = {};
//         retval[storyStageField] = 1;
//         myDb.collection("users").findOne({_id: _id}, retval, function (err, data) {
//             if(err) throw err;
//             done(data);
//         })
//     }
// }

//exporting user stuff
module.exports = {
    getAllUsers,
    getUser,
    getUserById,
    findInUsers,
    findOneInUsers,
    insertNewUser,
    updateUser,
    removeUser,
}