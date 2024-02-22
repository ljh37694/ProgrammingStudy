const express = require("express");
const app = express();
let serverTime = new Date();
const methodOverride = require("method-override");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method')) ;


const { MongoClient, ObjectId } = require("mongodb");

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

app.get("/", async (req, res) => {
    let result = await db.collection("post").find().toArray();

    // res.send("Hello");
    res.render("posts.ejs", { data : result });
});

app.get("/news", (req, res) => {
    res.send("오늘 비옴");
    db.collection("Post").insertOne({ title: "start" });
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/list", async (req, res) => {
    let result = await db.collection("post").find().toArray();
    console.log(result);
    res.render("posts.ejs", { data : result });
});

app.get("/time", (req, res) => {
    res.render("time.ejs", { time : serverTime });
});

app.get("/write", (req, res) => {
    res.render("write.ejs");
});

app.post("/add", async (req, res) => {
    try {
        if (req.body.title == "" || req.body.content == "") {
            alert("빈 칸이 있음");
        } else {
            await db.collection("post").insertOne(req.body, (err, result) => {
                console.log("저장 완료");
            });
        
            res.redirect("/list");
        }
    } catch(e) {
        console.log(e);
        res.status(500).send("서버 에러!!!");
    }
});

app.get("/detail/:_id", async (req, res) => {
    try {
        const result = await db.collection("post").findOne({_id : new ObjectId(req.params._id)});

        if (result == null) {
            res.status(400).send("그런 글 없음");
        }

        res.render("detail.ejs", { post : result });
    } catch(e) {
        res.send("이거 아님");
    }
});

app.get("/edit/:id", async (req, res) => {
    try {
        const result = await db.collection("post").findOne({_id : new ObjectId(req.params.id)});

        if (result == null) {
            res.status(400).send("그런 글 없음");
        }

        res.render("edit.ejs", { post : result });
    } catch(e) {
        res.send("이거 아님");
    }
});

app.put("/edit-post/:id", async (req, res) => {
    try {
        if (req.body.title == "" || req.body.content == "") {
            alert("빈 칸이 있음");
        } else {
            await db.collection("post").updateOne({ _id : new ObjectId(req.params.id)}, { $set : {title : req.body.title, content : req.body.content} });
        
            res.redirect("/list");
        }
    } catch(e) {
        console.log(e);
        res.status(500).send("서버 에러!!!");
    }
});

app.delete("/delete-post", async (req, res) => {
    await db.collection("post").deleteOne({ _id : new ObjectId(req.query.id) });
});

app.get("/list/:number", async (req, res) => {
    let num = parseInt(req.params.number);
    const LIM = 5;
    let result = await db.collection("post").find().skip(num * LIM).limit(LIM).toArray();
    
    res.render("posts.ejs", { data : result });
});