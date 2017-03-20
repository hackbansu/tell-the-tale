/**
 * Created by pawan on 12/3/17.
 */
//CRUD Operations on snippets database

const database = require('./database');
let myDb = database.myDb;
var ObjectId = require('mongodb').ObjectId;

myDb.collection("snippets").createIndex({votes: -1}, function (err, result) {
    console.log(result);
})

//insert a new snippet to the collection and return all info {ops: [{_id: ...}]}
function insertNewSnippet(snippet, done) {
    myDb.collection("snippets").insertOne(snippet, function (err, result) {
        if (err) throw err;
        // console.log(result);
        done(result);
    })
}

//remove the snippet via id and return all info {value:{_id: ...}}
function removeSnippet(_id, done) {
    myDb.collection("snippets").findOneAndDelete({_id: ObjectId(_id)}, function (err, result) {
        if (err) throw err;
        // console.log("Log after Deletion", result);
        done(result);
    })
}

//update snippet info via id return all info {value:{_id: ...}} except passage
function updateSnippet(_id, updates, done) {
    myDb.collection("snippets").findOneAndUpdate({_id: ObjectId(_id)}, updates, {projection: {passage: 0}}, function (err, result) {
        if (err) throw err;
        done(result);
    })
}

//get snippets details that satisfy toFind and return in the form [{_id: ...},{}]
function findInSnippets(toFind, toGet, skip, batchSize, limit, done) {
    if(typeof toFind['_id'] == "string"){
        toFind['_id'] = ObjectId(toFind['_id']);
    }
    let cursor = myDb.collection("snippets").find(toFind);
    cursor.project(toGet);
    cursor.skip(skip);
    cursor.batchSize(batchSize);
    cursor.limit(limit);
    cursor.toArray(function (err, data) {
        // console.log(data);
        done(data);
    })
}

//get required snippet details that satisfy toFind and return in the form {id: ...}
function findOneInSnippets(toFind, toGet, done) {
    if(typeof toFind['_id'] == "string"){
        toFind['_id'] = ObjectId(toFind['_id']);
    }
    myDb.collection("snippets").findOne(toFind, toGet, function (err, data) {
        if (err) throw err;
        done(data);
    });
}


//exporting snippets stuff
module.exports = {
    insertNewSnippet,
    removeSnippet,
    updateSnippet,
    findInSnippets,
    findOneInSnippets,
}