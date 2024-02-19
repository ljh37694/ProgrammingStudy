const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.listen(1234, () => {
    console.log("http://localhost:1234/ 서버 실행중");
});

app.get("/", (req, res) => {
    // res.send("Hello");
    res.sendFile(__dirname + "/index.html");
});

app.get("/news", (req, res) => {
    res.send("오늘 비옴");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});