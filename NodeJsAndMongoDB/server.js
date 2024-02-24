const express = require("express");
const app = express();
let serverTime = new Date();
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const MongoStore = require('connect-mongo');

let db;
const url =
    "mongodb+srv://ljh37694:hi37694*@forum.6p5dx3j.mongodb.net/?retryWrites=true&w=majority";
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

app.use(passport.initialize());
app.use(
    session({
        secret: "1234",
        resave: false,
        saveUninitialized: false,
        cookie : {maxAge : 1000 * 60},
        store : MongoStore.create({
            mongoUrl : "mongodb+srv://ljh37694:hi37694*@forum.6p5dx3j.mongodb.net/?retryWrites=true&w=majority",
            dbName : "Forum",
        })
    })
);
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

passport.use(
    new LocalStrategy(async (id, pw, cb) => {
        let result = await db.collection("user").findOne({ username: id });

        if (!result) {
            return cb(null, false, { message: "아이디 DB에 없음" });
        }

        if (await bcrypt.compare(pw, result.password)) {
            return cb(null, result);
        } else {
            return cb(null, false, { message: "비번불일치" });
        }
    })
);

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, { id: user._id, username: user.username });
    });
});

passport.deserializeUser(async (user, done) => {
    try {
        let result = await db.collection("user").findOne({ _id: new ObjectId(user.id) });
        delete result.password;

        process.nextTick(() => {
            done(null, result);
        });
    } catch(e) {
        console.log(e);
        return done(e);
    }
});

app.get("/", async (req, res) => {
    let result = await db.collection("post").find().toArray();

    res.render("posts.ejs", { data: result });
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
    res.render("posts.ejs", { data: result });
});

app.get("/time", (req, res) => {
    res.render("time.ejs", { time: serverTime });
});

app.get("/write", (req, res) => {
    if (req.user) {
        res.render("write.ejs");
    } else {
        res.render("login.ejs");
    }
});

app.post("/add", async (req, res) => {
    if (req.user) {

    }

    try {
        if (req.body.title == "" || req.body.content == "") {
            alert("빈 칸이 있음");
        } else {
            await db.collection("post").insertOne(req.body, (err, result) => {
                console.log("저장 완료");
            });

            res.redirect("/list");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("서버 에러!!!");
    }
});

app.get("/detail/:_id", async (req, res) => {
    try {
        const result = await db
            .collection("post")
            .findOne({ _id: new ObjectId(req.params._id) });

        if (result == null) {
            res.status(400).send("그런 글 없음");
        }

        res.render("detail.ejs", { post: result });
    } catch (e) {
        res.send("이거 아님");
    }
});

app.get("/edit/:id", async (req, res) => {
    try {
        const result = await db
            .collection("post")
            .findOne({ _id: new ObjectId(req.params.id) });

        if (result == null) {
            res.status(400).send("그런 글 없음");
        }

        res.render("edit.ejs", { post: result });
    } catch (e) {
        res.send("이거 아님");
    }
});

app.put("/edit-post/:id", async (req, res) => {
    try {
        if (req.body.title == "" || req.body.content == "") {
            alert("빈 칸이 있음");
        } else {
            await db.collection("post").updateOne(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                    },
                }
            );

            res.redirect("/list");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("서버 에러!!!");
    }
});

app.delete("/delete-post", async (req, res) => {
    try {
        await db.collection("post").deleteOne({ _id: new ObjectId(req.query.id) });
    } catch(e) {
        console.log(e);
        res.status(500).send("DB Error!");
    }
});

app.get("/list/:number", async (req, res) => {
    let num = parseInt(req.params.number);
    const LIM = 5;
    let result = await db
        .collection("post")
        .find()
        .skip(num * LIM)
        .limit(LIM)
        .toArray();

    res.render("posts.ejs", { data: result });
});

// 회원가입
app.get("/sign-up", (req, res) => {
    res.render("sign-up.ejs");
});

app.post("/sign-up", async (req, res) => {
    const id = req.body.username, pw = req.body.password, cpw = req.body.confirmPassword;
    let result = await db.collection("user").findOne({ username : id });
    let hashPw = await bcrypt.hash(id, 10);

    console.log(hashPw);

    if (id == "") {
         res.send("id가 빈칸임");
    }

    else if (pw == "") {
        res.send("password가 빈칸임");
    }

    else if (pw != cpw) {
        res.send("password가 다름");
    }

    else {
        if (result == null) {
            db.collection("user").insertOne({ username : id, password : hashPw });
            res.redirect("/login");
        } else {
            res.send("이미 가입된 아이디");
        }
    }
});

// 로그인
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", async (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) return res.status(500).json(error);
        if (!user) return res.status(401).json(info.message);

        req.logIn(user, (err) => {
            if (err) return next(err);

            res.redirect("/list");
        });
    })(req, res, next);

    console.log(req.user);
});

app.get("/my-page", async (req, res) => {
    res.render("my-page.ejs", { user: req.user });
    console.log(req.user);
});