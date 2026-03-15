const express = require("express");
const mysql = require("mysql2");
const app = express();
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(methodOverride("_method"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todolist',
    password: 'garvsekahohumhinduhai'
});

app.use(express.urlencoded({extended: true}));

app.get("/todoList", (req, res) => {
    let q = "SELECT * FROM todo";
    try {
        connection.query(q, (err,result) => {
            if (err) throw err;
            let works = result;
            res.render("todo.ejs", {works});
        });
    } catch (err) {
        console.log(err);
    }
    
});

app.post("/todoList", (req,res) => {
    const {work} = req.body;
    let q = `INSERT INTO todo (work) VALUES (?)`;
    if(work != ""){
        try {
        connection.query(q, [work], (err, result) => {
            if (err) throw err;
            res.redirect("/todoList");
        });
        } catch (err) {
            res.send(`post works but ERROR OCCURED: ${err}`);
        }
    } else {
        res.render("nowork.ejs");
    }
    
});

app.delete("/todoList/:work", (req, res) => {
    let {work} = req.params;
    let q = "DELETE FROM todo WHERE work = (?)";

    try {
        connection.query(q,[work], (err,result) => {
            if (err) throw err;
            res.redirect("/todoList");
        });
    } catch (err) {
        res.send(err);
    }
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});