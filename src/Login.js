

const mysql = require('mysql')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')


dotenv.config({path : "./.env"});

var connection = mysql.createConnection({
    user : process.env.DATABASE_USER,
    password :process.env.DATABASE_PASS,
    host : process.env.DATABASE_HOST,
    database : process.env.DATABASE
})

 

connection.connect() ? console.log('error') : console.log('Connected')
//connection.destroy() ? console.log('error') : console.log('Disconnected')

var app = express();

app.get('/',(req,res)=>{

res.send("<h1>jhgbhj</h1>")
}); 
app.listen(5055,()=>{ 

    console.log("server started")
});