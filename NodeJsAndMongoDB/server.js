const express = require("express");
const app = express();
let serverTime = new Date();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const { MongoClient } = require("mongodb");

let db;
const url ="mongodb+srv://ljh37694:hi37694*@forum.6p5dx3j.mongodb.net/?retryWrites=true&w=majority";
new MongoClient(url)
    .connect()
    .then((client) => {
        console.log("DB연결성공");
        db = client.db("Forum");

        app.listen(1234, () => {
            console.log("http://localhost:1234/ 서버 실행중");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    // res.send("Hello");
    res.sendFile(__dirname + "/index.html");
});

app.get("/news", (req, res) => {
    res.send("오늘 비옴");
    db.collection("Post").insertOne({ title: "start" });
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/list", async (req, res) => {
    let result = await db.collection("Post").find().toArray();
    console.log(result);
    res.render("posts.ejs", { data: result });
});

app.get("/time", (req, res) => {
    res.render("time.ejs", { time : serverTime });
});