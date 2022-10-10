const express = require('express');
const app = express();
const path = require("path");
const mysql = require('mysql');

/* ==================< Middle-Wares >================== */

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/* ==========< Building DataBase Connection >========== */

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo_db'
});

/* ===========< Checking DataBase Connection >========== */

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.log("Database Connected!");
    }
});

/* ============< Getting Data From DataBase >=========== */

app.get("/", (req, res) => {
    const Query = "SELECT * FROM USER";
    connection.query(Query, function (err, result, fields) {
        if (err) throw err;

        /* - Sending Retrieved Data To View Template - */

        res.render("viewUsers", {
            data: result
        });
    });
});

/* ================< Server Listening  >=============== */

app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Listening At Port 3000.");
})
