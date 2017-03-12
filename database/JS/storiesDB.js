/**
 * Created by pawan on 12/3/17.
 */
//CRUD Operations on stories database

const database = require('./database');
let myDb = database.myDb;

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

//exporting stories stuff
module.exports = {
    getAllStories,
    insertNewStory,
    updateStory,
    removeStory,
}