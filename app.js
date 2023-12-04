const path = require('path');
const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser')
const conn = require('./db/db.js');
const Router = require('./routes/routes.js');
require('dotenv').config()
var cors = require('cors')

const app = express();
app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(bodyParser.raw());

// conn.connect((err) =>{
//     if(err) throw err;
//     console.log('Mysql Connected...');
// });
app.use(Router);

// app.get('/', (req, res) => res.send('Hello Express!'))
app.listen(process.env.NODE_PORT, () => console.log('Ciungwanara Project Backend ini bekerja di http://localhost:4000'))