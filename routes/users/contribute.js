/**
 * Created by pawan on 13/3/17.
 */

const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

//function to return object with field and value as sent by caller
function getStageFieldValueObject(value, ...arr) {
    let field = "", reval = {};
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            field += arr[i];
        }
        else {
            field += arr[i] + ".";
        }
    }

    reval[field] = value;
    return retval;
}

//function to return field as sent by caller
function getStageField(...arr) {
    let field = "";
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            field += arr[i];
        }
        else {
            field += arr[i] + ".";
        }
    }

    return field;
}


//req.body = {storyId, storyTitle, stage, passage}
route.post('/addSnippet', function (req, res) {
    let snippet = {
        storyId: req.body.storyId,
        storyTitle: req.body.storyTitle,
        userId: req['user']._id,
        userEmail: req['user'].email,
        stage: req.body.stage,
        votes: 0,
        passage: req.body.passage,
    };

    db.snippets.insertNewSnippet(snippet, function (result) {
        // console.log(result);
        let updateToUser = getStageFieldValueObject(result.ops[0]._id, "contributions", req.body.storyTitle, req.body.stage);
        db.users.updateUser(req['user']._id, {$set: updateToUser}, function (nextResult) {
            // console.log(nextResult);
            let updateToStory = getStageFieldValueObject(result.ops[0]._id, "snippets", req.body.stage);
            db.stories.updateStory(req.body.storyId, {$push: updateToStory}, function (lastResult) {
                // console.log(lastResult);
                res.send(lastResult);
            });
        });
    });
});

//req.body = {snippetId, passage}
route.post('/updateSnippet', function (req, res) {
    db.snippets.updateSnippet(req.body.snippetId, {$set: {passage: req.body.passage}}, function (result) {
        // console.log(result);
        res.send(result);
    })
})

//req.query = {snippetId}
route.get('/removeSnippet', function (req, res) {
    db.snippets.removeSnippet(req.query.snippetId, function (result) {
        // console.log(result);
        let updateToUser = getStageFieldValueObject("", "contributions", result.value.storyTitle, result.value.stage);
        db.users.updateUser(req['user']._id, {$unset: updateToUser}, function (nextResult) {
            // console.log(nextResult);
            removeEmptyObjectsKeyValue("users", "findInUsers", "updateUser", req['user']._id, function () {
                // console.log(arguments[0]);
                let updateToStory = getStageFieldValueObject(result.value._id, "snippets", result.value.stage);
                db.stories.updateStory(result.value.storyId, {$pull: updateToStory}, function (lastResult) {
                    // console.log(lastResult);
                    removeEmptyObjectsKeyValue("stories", "findInStories", "updateStory", result.value.storyId, function () {
                        // console.log(arguments[0]);
                        res.send(lastResult);
                    }, "snippets", result.value.stage);
                })
            }, "contributions", result.value.storyTitle);

        })
    })
})

//req.query = {snippetId, storyTitle, stage}
route.get('/vote', function (req, res) {
    let field = ("votes." + req.query.storyTitle + "." + req.query.stage + "." + req.query.snippetId);
    let toFind = {};
    toFind[field] = {$exists: true};

    db.users.findInUsers(toFind, {_id: 1}, function (result) {
        let voteCount = 1;
        toFind[field] = "voted";
        let update = {$set: toFind};
        if (result) {
            voteCount = -1;
            toFind[field] = "";
            update = {$unset: toFind};
        }

        db.snippets.updateSnippet(req.query.snippetId, {$inc: {votes: voteCount}}, function (result) {
            // console.log(result);
            db.users.updateUser(req['user']._id, update, function (nextResult) {
                // console.log(nextResult);
                if(update['$set']){
                    res.json(nextResult);
                }
                else{
                    removeEmptyObjectsKeyValue("users", "findInUsers", "updateUser", req['user']._id, function () {
                        // console.log(arguments[0]);
                        if(arguments[0]){
                            removeEmptyObjectsKeyValue("users", "findInUsers", "updateUser", req['user']._id, function () {
                                res.send(nextResult);
                            }, "votes", req.query.storyTitle);
                        }
                        else{
                            res.send(nextResult);
                        }
                    }, "votes", req.query.storyTitle, req.query.stage)
                }

            })
        })

    })
})

//req.query = {storyTitle, category}
route.get('/addStory', function (req, res) {
    let story = {
        title: req.query.title,
        initiator: req['user'].email,
        category: req.query.category,
        snippets: {},
    };

    db.stories.insertNewStory(story, function (result) {
        // console.log(result);
        // let update = getStageFieldValueObject(result.ops[0]._id, "contributions", result.ops[0].title, "hasStarted"});
        // db.users.updateUser(req['user']._id, {$set: update}, function (nextResult) {
        // console.log(nextResult);
        // res.send(nextResult);
        // })
        res.send(result);
    })

})

//req.query = {storyId}
route.get('/removeStory', function (req, res) {
    db.stories.findInStories({_id: req.query.storyId}, {snippets: 1}, function (result) {
        // console.log(result);
        if (isObjectEmpty(result.snippets)) {
            db.stories.removeStory(res.body.storyId, function (nextResult) {
                // console.log(nextResult);
                res.json(true);
            })
        }
        else {
            res.json(false);
        }
    })

})

function isObjectEmpty(obj) {
    if(typeof obj.length == 'undefined'){
        for (var x in obj) {
            if (obj.hasOwnProperty(x))  return false;
        }
        return true;
    }
    else{
        if(obj.length != 0){
            return false;
        }
        return true;
    }
}

function removeEmptyObjectsKeyValue(databaseName, findFunctionName, updateFunctionName, id, done, ...arr) {
    let toFind = getStageFieldValueObject(1, ...arr);
    db[databaseName][findFunctionName]({_id: id}, toFind, function (result) {
        if(isObjectEmpty(result)){
            let toUpdate = getStageFieldValueObject("", ...arr)
            db[databaseName][updateFunctionName](id, {$unset: toUpdate}, done);
        }
        else{
            done();
        }
    });
}

module.exports = route;