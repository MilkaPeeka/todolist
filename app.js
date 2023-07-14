const express = require("express");
const bp = require("body-parser");
const {getDate, getDay} = require(__dirname + "/date.js");
console.log(getDay());
var app = express();
app.use(bp.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


const todos_main = ["Add your wanted item by", "Clicking on the +, and remove", "By checking the box"];
const todos_work = [];

app.get("/" ,(req, res) => {
    const data = {
        curr_date: getDate(),
        todos: todos_main,
        came_from: "main"
    };
    res.render("index", data);
}
);


app.post("/" ,(req, res) => {
    console.log(req.body.came_from);
    if (req.body.came_from === "main"){
        todos_main.push(req.body.item);
        res.redirect("/");
    }

    else {
        todos_work.push(req.body.item);
        res.redirect("/work");
    }

});

app.get("/work" ,(req, res) => {
    const data = {
        curr_date: getDate(),
        todos: todos_work,
        came_from: "work"
    };
    res.render("index", data);
}
);


app.listen("3000", () => {
console.log("listening on 3000");
});