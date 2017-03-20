/**
 * Created by pawan on 17/3/17.
 */
const db = require('../../database/JS/database');
const router = require('express').Router;
const route = router();

//req.query = {skip, limit}
route.get('/getRecentStoriesTitles', function (req, res) {
    db.stories.getRecentStoriesTitles(req.query.skip, req.query.limit, function (result) {
        // console.log(result);
        res.send(result);
    })
})

//req.query = {storyId}
route.get("/getStoryDetails", function (req, res) {
    db.stories.findOneInStories({_id: req.query.storyId}, {snippets:0}, function (result) {
        // console.log(result);
        res.send(result);
    })
})

//req.query = {storyId}
route.get("/getStagesWithFewSnippetsOfStory", function (req, res) {
    
})

module.exports = route;