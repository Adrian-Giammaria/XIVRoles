const dotenv = require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient

// setup debug.log
const fs = require('fs')
const util = require('util')
let logFile = fs.createWriteStream( './debug.log' )
console.log = (message) => {
  message = util.format(message) + '\n'
  logFile.write(message)
}

const app	= express();  			// activate an express app
app.use( express.json() ); 		// enable parsing of JSON data in our app

app.use('/XIVRoleAPI', express.static('public'))

// Listen for HTTP GET requests.
app.get('/XIVRoleAPI/scholar/', (req, res) => { //get request for scholar job actions

    // log information about the request
    console.log('Actions requested'
        + ' on ' + new Date()
        + ' by ' + req.headers['x-forwarded-for']
        + ' with ' + req.headers['user-agent']
        + ' at ' + req.headers['referer']
      )

  const client = new MongoClient( //set up mongoDB connection credentials
        process.env.DB, { //external hidden file to hold username and password
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
    );

  client.connect(err => { //connect to connection
    if (err) { console.log(err); }
    let query = {UrlType:{$eq:"Action"}} //CRUD query to filter specific results eg: height greater than 10
    let projection = {'Name':1,'Icon':1,'ID':1} //list of requested fields (1 is positive, 0 is negative)
    // search mongo collection for all scholar actions
    client.db("Proj2DB").collection("SCH")
      .find( query ) //run the query
      .project( projection ) //activate the projection
      .toArray( (err, item) => { //convert data to an array
        if (err) { res.send({ 'error': 'An error has occured' }); } //check if there's an error
        else { res.send( item );	}		// if there's no error send the result back.
      });
  });
}); //end scholar request

app.get('/XIVRoleAPI/astrologian/', (req, res) => { //get request for astrologian job actions

    // log information about the request
    console.log('Actions requested'
        + ' on ' + new Date()
        + ' by ' + req.headers['x-forwarded-for']
        + ' with ' + req.headers['user-agent']
        + ' at ' + req.headers['referer']
      )

  const client = new MongoClient( //set up mongoDB connection credentials
        process.env.DB, { //external hidden file to hold username and password
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
    );

  client.connect(err => { //connect to connection
    if (err) { console.log(err); }
    let query = {UrlType:{$eq:"Action"}} //CRUD query to filter specific results eg: height greater than 10
    let projection = {'Name':1,'Icon':1,'ID':1} //list of requested fields (1 is positive, 0 is negative)
    // search mongo collection for all scholar actions
    client.db("Proj2DB").collection("AST")
      .find( query ) //run the query
      .project( projection ) //activate the projection
      .toArray( (err, item) => { //convert data to an array
        if (err) { res.send({ 'error': 'An error has occured' }); } //check if there's an error
        else { res.send( item );	}		// if there's no error send the result back.
      });
  });
}); //end astrologian request

app.get('/XIVRoleAPI/whitemage/', (req, res) => { //get request for white mage job actions

    // log information about the request
    console.log('Actions requested'
        + ' on ' + new Date()
        + ' by ' + req.headers['x-forwarded-for']
        + ' with ' + req.headers['user-agent']
        + ' at ' + req.headers['referer']
      )

  const client = new MongoClient( //set up mongoDB connection credentials
        process.env.DB, { //external hidden file to hold username and password
          useUnifiedTopology: true,
          useNewUrlParser: true
        }
    );

  client.connect(err => { //connect to connection
    if (err) { console.log(err); }
    let query = {UrlType:{$eq:"Action"}} //CRUD query to filter specific results eg: height greater than 10
    let projection = {'Name':1,'Icon':1, 'ID':1} //list of requested fields (1 is positive, 0 is negative)
    // search mongo collection for all scholar actions
    client.db("Proj2DB").collection("WHM")
      .find( query ) //run the query
      .project( projection ) //activate the projection
      .toArray( (err, item) => { //convert data to an array
        if (err) { res.send({ 'error': 'An error has occured' }); } //check if there's an error
        else { res.send( item );	}		// if there's no error send the result back.
      });
  });
}); //end white mage request

  app.listen(0, () => {
   console.log("We are live." );
 });
