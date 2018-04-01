const express = require('express');
const app = express();
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

// // Connect to MongoDb
// const uri = "mongodb+srv://Rudi:dfvPZYENNbrntoXM@myfirstcluster-cvwrb.mongodb.net"
// const connection = (closure) => {
//     return MongoClient.connect(uri, (err, client) => {
//         // const db = client.db('mean');
//         // if (err) return console.log(err);
//         if(err) throw err;

//         var db = client.db('mandatory');

//         // db.collection('users').findOne({}, function (findErr, result) {
//         //     if (findErr) throw findErr;
//         //     console.log(result.name);
//         //     client.close();
//         //   });
        
//         //if (err) return console.log(err);

//         closure(db);
//     });
// };


// Error handling
// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// };

// // Response handling
// let response = {
//     status: 200,
//     data: [],
//     message: null
// };


// Get Bowlers
// app.get('/api/bowlers', (req, res) => {
//     connection((db) => {
//         db.collection('Bowlers')
//             .find()
//             .toArray()
//             .then((bowlers) => {
//                 response.data = bowlers;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

// Get Tournaments
// app.get('/api/tournaments', (req, res) => {
//     connection((db) => {
//         db.collection('Tournaments')
//             .find()
//             .toArray()
//             .then((tournaments) => {
//                 response.data = tournaments;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

// Get LVS
// app.get('/api/lvs', (req, res) => {
//     connection((db) => {
//         db.collection('lvs')
//             .find().limit(200)
//             .toArray()
//             .then((lvsData) => {
//                 response.data = lvsData;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

const courses = [{
        id: 1,
        name: 'course 1'
    },
    {
        id: 2,
        name: 'course 2'
    },
    {
        id: 3,
        name: 'course 3'
    }
]

app.get('/', (req, res) => {
    res.send('hello world!!!!!');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
   if(!course) res.status(404).send('Course with the given ID was not found.')
   res.send(course);
});


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on localhost:${port}`));