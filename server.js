const express = require('express');
const morgan = require('morgan');
const path = require('path');
const admin=require('firebase-admin');
var serviceAccount = require("./app/jscalendar-fcc52-firebase-adminsdk-txh06-5c51635a4a.json");
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'https://jscalendar-fcc52-default-rtdb.firebaseio.com/'
});


const DEFAULT_PORT = process.env.PORT || 3030;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

// Configure morgan module to log all requests.
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
// Setup app folders.
app.use(express.static('app'));

const db=admin.database();

// Set up a route for index.html
app.get('*', (req, res) => {
    db.ref('plans').once('value',(snapshot)=>{
        const data=snapshot.val();
    });
    res.type(".js");
    res.send("renderCalendar");
    res.sendFile(path.join(__dirname + '/app/index.html'));

});
/*
app.post('/setTask',(req,res)=>{
    const newTask={
        taskName:req.body.title,
        date:req.body.start,
        assign:req.body.email
    }
    db.ref('plans').push(newTask);
    //res.send("received");
});
*/


// Start the server.
app.listen(port);
console.log(`Listening on port ${port}...`);
