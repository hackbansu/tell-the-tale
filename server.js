/**
 * Created by pawan on 7/3/17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', express.static(path.join(__dirname, "public_html")));

app.listen(3333, function () {
    console.log("server started at 3333");
})
