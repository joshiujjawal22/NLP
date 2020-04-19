var path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
var aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();

let projectData = {};

const app = express()

app.use(express.static('dist'))
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/test', function (req, res) {
    console.log(req.body)
    return textapi.sentiment({
        url: req.body.url
      }, function(error, response) {
        if(error){
            console.log(error);
            return
        }
            projectData['polarity'] = response.polarity;
            projectData['subjectivity'] = response.subjectivity;
            projectData['polarity_confidence'] = response.polarity_confidence;
            projectData['subjectivity_confidence'] = response.subjectivity_confidence;
            console.log(projectData)
            res.send(projectData);
            }); 
    });
