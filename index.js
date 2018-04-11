const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// Connect to MongoDb
const uri = "mongodb+srv://Rudi:dfvPZYENNbrntoXM@myfirstcluster-cvwrb.mongodb.net"
const connection = (closure) => {
    return MongoClient.connect(uri, (err, client) => {
        // const db = client.db('mean');
        // if (err) return console.log(err);
        if(err) throw err;

        var db = client.db('mandatory');

        // db.collection('users').findOne({}, function (findErr, result) {
        //     if (findErr) throw findErr;
        //     console.log(result.name);
        //     client.close();
        //   });
        
        //if (err) return console.log(err);

        closure(db);
    });
};


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// // Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


// Get Bowlers
app.get('/api/bowlers', (req, res) => {
    connection((db) => {
        db.collection('Bowlers')
            .find()
            .toArray()
            .then((bowlers) => {
                response.data = bowlers;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get Tournaments
app.get('/api/tournaments', (req, res) => {
    connection((db) => {
        db.collection('Tournaments')
            .find()
            .toArray()
            .then((tournaments) => {
                response.data = tournaments;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get LVS
app.get('/api/lvs', (req, res) => {
    connection((db) => {
        db.collection('lvs')
            .find().limit(200)
            .toArray()
            .then((lvsData) => {
                response.data = lvsData;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



app.get('/', (req, res) => {
    res.send('<h1>Hello guest</h1> <br> <p>To access <b>Bowlers:</b>/api/bowlers</p> <br> <p>To access <b>Tournaments:</b>/api/tournaments</p><br> <p>To access <b>LVS:</b>/api/lvs</p>');
});




// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on localhost:${port}`));