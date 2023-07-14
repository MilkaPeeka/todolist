const express = require("express");
const bp = require("body-parser");

var app = express();
app.use(bp.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


const todos = ["Add your wanted item by", "Clicking on the +, and remove", "By checking the box"];


app.get("/" ,(req, res) => {
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric"};
    const data = {
        curr_date: new Date().toLocaleDateString("en-GB", options),
        todos: todos
    };
    res.render("index", data);
}
);


app.post("/" ,(req, res) => {
    todos.push(req.body.item);
    res.redirect("/");
});



app.listen("3000", () => {
console.log("listening on 3000");
});