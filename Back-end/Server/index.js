//express constants
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

var db;
var locationsCollection;

//mongoDB constants
const mongoClient = require('mongodb').MongoClient;
const mongoURI = "mongodb+srv://daniel:Chiefgustavo000@mldetection-atgfo.mongodb.net/test?retryWrites=true&w=majority";

    let connectToDatabase = async () => {

    return new Promise(function(resolve, reject) {

        console.time('database connection');
        mongoClient.connect(mongoURI, {useUnifiedTopology: true},function (err, client) {
            db = client.db('detectionDB');
            locationsCollection = db.collection('ice_check');
            console.timeEnd('database connection');
            resolve();
        })

    });

};

connectToDatabase()
.then(() =>
    (app.listen(port), console.log('App is listening on port ' + port))
)
.catch(async (anError) => {
    console.log(anError);
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/api/getConditions', async (req, res) => {

    // res.json([1, 2, 3, 4, 5]);

    let locations = req.body.locations;
    getAllConditions(locations).then(
        (conditions) => {
            console.log(conditions);
            try {
                console.log(typeof conditions);
                console.log(Object.keys(conditions).length);
                res.json(conditions)
            } catch (e) {
                console.log(e.toString())
            }
        },
        () => {
            res.send("An error occurred while retrieving the conditions");
        }
    )

});

let getAllConditions = async (locations) => {

    return new Promise(function (resolve, reject) {

        let conditions = {};
        let promises = [];

        for (let i=0; i<locations.length; i++){
            promises.push(getCondition(locations[i], conditions));
        }

        Promise.all(promises)
            .then(() => {
                // console.log(conditions);
                resolve(conditions);
            })
            .catch((e) => {
                console.log("An error occurred while retrieving from the database");
                reject();
            });

    });

};

let getCondition = async (aLocation, conditions) => {


    return new Promise(function (resolve, reject) {

        locationsCollection.find(
            {gps_location: {latitude: aLocation.latitude, longitude: aLocation.longitude}}
        ).toArray(function(err, docs) {
            if (err) {
                reject();
            } else if (docs.length === 0) {
                resolve(conditions);
            } else {
                let condition = docs[0].condition;
                let filename = docs[0].filename;
                let latitude = docs[0].gps_location.latitude;
                let longitude = docs[0].gps_location.longitude;
                let temp = {
                    id: filename,
                    condition: condition,
                    latitude: latitude,
                    longitude: longitude
                };
                conditions[filename] = temp;
                resolve(conditions)
            }
        })

        // locationsCollection.find(
        //     {}
        // ).toArray(function(err, docs) {
        //     if (err) {
        //         reject();
        //     } else if (docs.length === 0) {
        //         resolve(conditions);
        //     } else {
        //         console.log(docs)
        //     }
        // })

    });

};
