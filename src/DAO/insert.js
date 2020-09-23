var mysql = require('mysql')

var connection = mysql.createConnection({
    user : 'root',
    password : '',
    host : 'localhost',
    database : 'notesmate'
})



connection.connect() ? console.log('error') : console.log('Connected')

var dddd={
    email : 'dxdd',password : 'dddqd',date:'wwdd'
}

var qww=connection.query('insert into user set ? ',dddd,function(err,result){console.log(qww.sql)
if(err) { console.error(err); return;} 

console.error(result)

connection.destroy()? console.log('error') : console.log('Disconnected')
})