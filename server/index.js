const mysql = require('mysql')
const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({ path: "./.env" });
var app = express();



var connection = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE
})


//   connection.connect() ? console.log('error') : console.log('Connected')
//connection.destroy() ? console.log('error') : console.log('Disconnected')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/insert", (req, res) => {

    // console.log(req)

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const date = req.body.date
    const success = true
    const fail = false
    var comp = ''
    var compq = []
    var sqlselect = "SELECT * FROM user WHERE email=?";
    connection.query(sqlselect, [email], (err, result) => {



        if ((result[0] === undefined) && (!name !== comp)) {
            var sqlInsert = "INSERT INTO user (name,email,password,date) VALUES (?,?,?,?)";

            connection.query(sqlInsert, [name, email, password, date], (err, result) => {
                if (err == null) {
                    var sqlselect = "SELECT * FROM user WHERE email=?";
                    connection.query(sqlselect, [email], (err, result) => {

                        res.send({ email: result['0']['email'],name:result['0']['name'], uid: result['0']['uid'], statuss: true })
                        console.log("ss---------->", err)
                    })



                } else {
                    res.send({ email: '', uid: '', statuss: false })
                    console.log("ff---------->", err)
                }

            })
            console.log("---------->", err)
                //   res.send(success)

        } else {
            //  console.log(result)
            res.send({ email: '', uid: '', statuss: false })
                // console.log(err)
                // console.log(result[0])
        }
        //  console.log(result[0])


    })




})



app.post("/api/insert/login", (req, res) => {

    // console.log(req)


    const email = req.body.email
    const password = req.body.password

    const success = true
    const fail = false

    var sqlselect = "SELECT * FROM user WHERE email=? AND password=?";
    connection.query(sqlselect, [email, password], (err, result) => {
        try {

            if (result[0]['email'] == email) {

                res.send({ uid: result[0].uid, name: result[0].name, status: success })
                    //   console.log(result[0])

            } else {
                //  console.log(result)
                res.send(fail)
            }
            // console.log(result[0]['email'])
        } catch (errcatch) {
            res.send(fail)
        }


    })


})

app.get("/api/select", (req, res) => {

    // const email = req.body.email
    // const password = req.body.password
    // const date = req.body.date

    var sqlselect = "SELECT * from user WHERE uid=1";
    connection.query(sqlselect, (err, result) => {
            res.send({ name: result[0].name, uid: result[0].uid })
        })
        //  connection.end() ? console.log('error') : console.log('Disconnected')

})

app.post("/api/savenotes", (req, res) => {
    const uid = req.body.uid
    const title = req.body.title
    const note = req.body.note
    const date = req.body.date
    try {


        var sqlInsert = "INSERT INTO notes (title,note,uid,data) VALUES (?,?,?,?)";
        connection.query(sqlInsert, [title, note, uid, date], (err, result) => {
            //  if (err == null) { res.send(success) } else {
            res.send(result)
                //}
            console.log(err)
        })

        //   res.send(success)

    } catch (errcatch) {
        res.send(fail)
    }

})



app.post("/api/getnotes", (req, res) => {
    const uid = req.body.uid

    try {


        var sqlInsert = "SELECT * FROM notes WHERE uid = ?";
        connection.query(sqlInsert, [uid], (err, result) => {
            //  if (err == null) { res.send(success) } else {
            res.send(result)
                //}
            console.log(err)
        })

        //   res.send(success)

    } catch (errcatch) {
        res.send(fail)
    }

})

app.post("/api/deletenotes", (req, res) => {
    const uid = req.body.uid

    try {


        var sqlInsert = "DELETE FROM notes WHERE id = ?";
        connection.query(sqlInsert, [uid], (err, result) => {
            res.send(result)
            console.log(err)
        })
    } catch (errcatch) {
        res.send(fail)
    }

})

app.post("/api/editnotes", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const note = req.body.note
    try {


        var sqlInsert = "UPDATE notes SET title=?,note=? WHERE id = ?";
        connection.query(sqlInsert, [title, note, id], (err, result) => {
            var sqlInsert = "SELECT * FROM notes WHERE id = ?";
            connection.query(sqlInsert, [id], (err, result) => {
                res.send(result[0])

            })


        })
    } catch (errcatch) {
        res.send(fail)
    }

})


app.listen(5055, () => {
    console.log("server started")
})