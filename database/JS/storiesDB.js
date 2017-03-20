/**
 * Created by pawan on 12/3/17.
 */
//CRUD Operations on stories database

const database = require('./database');
let myDb = database.myDb;
var ObjectId = require('mongodb').ObjectId;

//get all stories return all info [{_id: ...},{}]
function getAllStories(done) {
    myDb.collection("stories").find({}).toArray(function (err, data) {
        // console.log("log after getting all users", data);
        done(data);
    })
}

//get all stories return all info [{_id: ...},{}]
function getRecentStoriesTitles(skip, limit, done) {
    let cursor = myDb.collection("stories").find();
    cursor.sort({_id: -1});
    cursor.batchSize(limit);
    cursor.skip(skip);
    cursor.limit(limit);
    cursor.toArray(function (err, data) {
        // console.log("Log after getting few stories titles", data);
        done(data);
    })
}

//insert a new story to the collection and return {ops: [{_id: ...}]}
function insertNewStory(story, done) {
    myDb.collection("stories").insertOne(story, function (err, result) {
        if (err) throw err;
        // console.log(result);
        done(result);
    })
}

//update existing story via id and return all info {value:{_id: ...}} except snippets
function updateStory(_id, updates, done) {
    myDb.collection("stories").findOneAndUpdate({_id: ObjectId(_id)}, updates, {projection: {snippets: 0}}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

//remove a story via id and return all info {value:{_id: ...}}
function removeStory(_id, done) {
    myDb.collection("stories").findOneAndDelete({_id: ObjectId(_id)}, function (err, result) {
        if (err) throw err;
        // console.log("Log after Deletion", result);
        done(result);
    })
}

//get stories details that satisfy toFind and return in the form [{_id: ...},{}]
function findInStories(toFind, toGet, skip, batchSize, limit, done) {
    if(typeof toFind['_id'] == "string"){
        toFind['_id'] = ObjectId(toFind['_id']);
    }
    let cursor = myDb.collection("stories").find(toFind);
    cursor.project(toGet);
    cursor.skip(skip);
    cursor.batchSize(batchSize);
    cursor.limit(limit);
    cursor.toArray(function (err, data) {
        // console.log(data);
        done(data);
    })
}

//get required story details that satisfy toFind and return in the form {id: ...}
function findOneInStories(toFind, toGet, done) {
    if(typeof toFind['_id'] == "string"){
        toFind['_id'] = ObjectId(toFind['_id']);
    }
    myDb.collection("stories").findOne(toFind, toGet, function (err, data) {
        if (err) throw err;
        done(data);
    });
}

function getFewSnippetsOfTheStory(_id, done) {
    myDb.stories.aggregate({
        $match: {_id: ObjectId(_id)},
        $project: {snippets: 1},
    }, function (err, result) {
        result.aggregate({
            
        })
    })
}

//exporting stories stuff
module.exports = {
    getAllStories,
    getRecentStoriesTitles,
    findInStories,
    findOneInStories,
    insertNewStory,
    updateStory,
    removeStory,
}