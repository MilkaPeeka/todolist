const express = require("express");
const bp = require("body-parser");
const {getDate, getDay} = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const process = require("process");

const app = express();
app.use(bp.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = new mongoose.Schema({
    body: String,
    isMarked: Boolean
});

const ItemRegular = mongoose.model("RegularItem", itemSchema);
const ItemWork = mongoose.model("WorkItem", itemSchema);
const todos_main = [];
const todos_work = [];

ItemRegular.find({}).then((results) =>
{
    results.forEach((reult) =>{
        todos_main.push(reult);
    });
}).catch((err) =>{
    throw err;
});
ItemWork.find({}).then((results) =>
{
    results.forEach((reult) =>{
        todos_work.push(reult);
    });
}).catch((err) =>{
    throw err;
});

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
    if (req.body.came_from === "main"){
        todos_main.push(new ItemRegular({body: req.body.item, isMarked: false}));
        todos_main[todos_main.length - 1].save();
        res.redirect("/");
    }

    else {
        todos_work.push(new ItemWork({body: req.body.item, isMarked: false}));
        todos_work[todos_work.length - 1].save();
        res.redirect("/work");
    }

});
app.post("/update_state", (req, res) => {
        if (req.body.came_from === "main"){
        todos_main.forEach((item) => {
        if (item._id == req.body.itemID){
            console.log(item.isMarked);
            item.isMarked = !item.isMarked;
            console.log(item.isMarked);
            item.save();
        }
        });
        console.log("got here");
        res.redirect('/');
        return;
    }
    else {
        todos_work.forEach(item => {
            if (item._id == req.body.itemID){
                item.isMarked = !item.isMarked;
                item.save();

            }
            });
            res.redirect('/work');
            return;
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


app.listen(process.env.PORT || "3000", () => {
    console.log("listening on 3000" );
});