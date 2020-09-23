var mysql = require('mysql')

var connection = mysql.createConnection({
    user : 'root',
    password : '',
    host : 'localhost',
    database : 'notesmate'
})



connection.connect() ? console.log('error') : console.log('Connected')
var datadd
function dataf(datad){
    console.log(datad[1])

}

connection.query('select * from user',function(err,data){
    if(err) { console.error(err); return;} 
    
    dataf(data)
    
    connection.destroy()? console.log('error') : console.log('Disconnected')
    })
 
