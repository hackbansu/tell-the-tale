const mongodb = require('mongodb');
const mongoURL = 'mongodb://localhost:27017/tell-the-tale';

let myDb;

function init(done) {                                                      //initialize mongodb
    mongodb.MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;

        myDb = db;
        done();
    })
}


//CRUD Operations on users database
function getAllUsers(done) {                                                //get all users
    myDb.collection("users").find({}).toArray(function (err, data) {
        if (err) throw err;
        // console.log("log after getting all users", data);
        done(data);
    })
}

function getUser(email, done) {                                          //get a user
    let user = myDb.collection("users").findOne({email: email});
    done(data);
}

function userExists(email, done) {                                         //Does user Exists?
    myDb.collection("users").findOne({email: email}, {email: 1}, function (err, data) {
        if(err) throw err;
        done(data);
    });
}

function insertNewUser(user, done) {                                     //insert new user
    myDb.collection("users").insertOne(user, function (err, result) {
        if (err) throw err;
        console.log("Log after insertion", result.ops[0]);
        done(result);
    })
}

function updateUser(userId, updates, done) {                                       //update a user
    myDb.collection("users").updateOne({_id: ObjectID(userId)}, {$set: updates}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

function removeUser(email, done) {                                       //remove a user
    myDb.collection("users").findOneAndDelete({email: email}, function (err, result) {
        if (err) throw err;
        // console.log("Log after Deletion", result);
        done(result);
    })
}


//CRUD Operations on snippets database
function insertNewSnippet(snippet, done) {                                      //insert a new snippet
    myDb.collection("snippets").insertOne(snippet, function (err, result) {
        if (err) throw err;
        // console.log(result);
        done(result);
    })
}

function removeSnippet(snippetId, done) {                                       //remove a snippet
    myDb.collection("snippets").removeOne({_id: ObjectID(snippetId)}, function (err, result) {
        if (err) throw err;
        // console.log("Log after Deletion", result);
        done(result);
    })
}

function updateSnippet(snippetId, updates, done) {                                       //update a snippet
    myDb.collection("snippets").updateOne({_id: ObjectID(snippetId)}, {$set: updates}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}


//CRUD Operations on stories database
function getAllStories(done) {                                            //get all stories
    myDb.collection("stories").find({}).toArray(function (err, data) {
        // console.log("log after getting all users", data);
        done(data);
    })
}

function insertNewStory(story, done) {                                       //insert new story
    myDb.collection("stories").insertOne(story, function (err, result) {
        if (err) throw err;
        // console.log(result);
        done(result);
    })
}

function updateStory(storyId, updates, done) {                                       //update existing story
    myDb.collection("stories").updateOne({_id: ObjectID(storyId)}, {$set: updates}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

function removeStory(storyName, done) {                                        //remove a story
    myDb.collection("stories").removeOne({storyName: storyName}, function (err, result) {
        if (err) throw err;
        // console.log("Log after Deletion", result);
        done(result);
    })
}


module.exports = {
    init,

    //exporting user stuff
    getAllUsers,
    getUser,
    userExists,
    insertNewUser,
    updateUser,
    removeUser,

    //exporting snippets stuff
    insertNewSnippet,
    removeSnippet,
    updateSnippet,

    //exporting stories stuff
    getAllStories,
    insertNewStory,
    updateStory,
    removeStory,

}