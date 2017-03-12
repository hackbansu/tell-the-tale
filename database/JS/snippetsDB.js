/**
 * Created by pawan on 12/3/17.
 */
//CRUD Operations on snippets database

const database = require('./database');
let myDb = database.myDb;

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

//exporting snippets stuff
module.exports = {
    insertNewSnippet,
    removeSnippet,
    updateSnippet,
}