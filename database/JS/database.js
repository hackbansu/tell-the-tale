const mongodb = require('mongodb');
const mongoURL = 'mongodb://localhost:27017/tell-the-tale';

let myDb;

function init(done) {                                                      //initialize mongodb
    mongodb.MongoClient.connect(mongoURL, function (err, db) {
        if (err) throw err;
        module.exports.myDb = myDb = db;
        Object.assign(
            module.exports,
            {
                users: require('./usersDB'),
                snippets: require('./snippetsDB'),
                stories: require('./storiesDB'),
            }
        );

        done();
    })
}


//exporting things
module.exports = {
    init,
};
