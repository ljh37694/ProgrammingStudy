const express = require("express");
const app = express();
let serverTime = new Date();
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);

let db;
const url = process.env.DB_URL;
new MongoClient(url)
    .connect()
    .then((client) => {
        console.log("DB연결성공");
        db = client.db("Forum");

        server.listen(process.env.PORT, () => {
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
        cookie: { maxAge: 1000 * 60 },
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
            dbName: "Forum",
        }),
    })
);
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/board", checkLogin);
app.use("/board", require("./routes/board.js"));

/* 
    많은 api에서 middleware를 적용하기 위해서 app.use를 사용한다. 
    app.use() 밑에 있는 모든 api에 적용된다.
*/
//app.use(checkLogin);

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
        let result = await db
            .collection("user")
            .findOne({ _id: new ObjectId(user.id) });
        delete result.password;

        process.nextTick(() => {
            done(null, result);
        });
    } catch (e) {
        console.log(e);
        return done(e);
    }
});

io.engine.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        dbName: "Forum",
    }),
}));

function checkLogin(req, res, next) {
    if (req.user) {
        next(); // next()는 정상이니까 다음으로 넘어가라는 의미, 마지막에 넣는게 좋음
    } else {
        res.send("로그인을 하세요.");
    }
}

function printCurTime(req, res, next) {
    console.log(serverTime);

    next();
}

function checkBlankOfLoginInput(req, res, next) {
    const id = req.body.username,
        pw = req.body.password,
        cpw = req.body.confirmPassword;

    if (id == "") {
        res.send("아이디기 빈칸입니다.");
    } else if (pw == "" || cpw == "") {
        res.send("비밀번호가 빈칸입니다.");
    } else {
        next();
    }
}

app.get("/", async (req, res) => {
    let result = await db.collection("post").find().toArray();

    if (req.user) {
        res.render("posts.ejs", { data: result });
    } else {
        res.render("login.ejs");
    }
});

app.get("/news", (req, res) => {
    res.send("오늘 비옴");
    db.collection("Post").insertOne({ title: "start" });
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/list", printCurTime, async (req, res) => {
    let result = await db.collection("post").find().toArray();
    res.render("posts.ejs", { data: result, user: req.user });
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

    res.render("posts.ejs", { data: result, user: req.user });
});

app.get("/list/search/:title", async (req, res) => {
    const regex = new RegExp(`${req.params.title}`, "i");
    const searchCondition = [
        {
            $search: {
                index: "title_index",
                text: { query: req.params.title, path: "title" },
            },
        },
        {
            $limit: 3,
        },
        {
            $project: { _id: 0 },
        },
    ];

    // 순차 탐색으로 찾기 O(n)
    // let result = await db.collection("post").find({ "title" : { "$regex" : regex }}).toArray();

    // index를 이용해서 title을 찾기
    // let answer = await db.collection("post").find({ "$text" : { "$search" : req.params.title }});

    let result = await db
        .collection("post")
        .aggregate(searchCondition)
        .toArray();

    console.log(result);

    res.render("posts.ejs", { data: result, user: req.user });
});

app.get("/time", (req, res) => {
    res.render("time.ejs", { time: serverTime });
});

// middleware 사용, 여러 개 넣으려면 []에 함수를 넣으면 된다.
app.get("/write", checkLogin, (req, res) => {
    if (req.user) {
        res.render("write.ejs");
    } else {
        res.render("login.ejs");
    }
});

app.post("/add", async (req, res) => {
    try {
        if (req.body.title == "" || req.body.content == "") {
            alert("빈 칸이 있음");
        } else {
            await db.collection("post").insertOne(
                {
                    title: req.body.title,
                    content: req.body.content,
                    user: req.user._id,
                    username: req.user.username,
                },
                (err, result) => {
                    console.log("저장 완료");
                }
            );

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

        const comments = await db
            .collection("comments")
            .find({ parent_id: new ObjectId(req.params._id) })
            .toArray();

        console.log(comments);

        if (result == null) {
            res.status(400).send("그런 글 없음");
        }

        res.render("detail.ejs", { post: result, comments: comments });
    } catch (e) {
        res.send("이거 아님");
        console.log(e);
    }
});

app.post("/comment/:_id", async (req, res) => {
    try {
        if (req.body.comment == "") {
            res.send("댓글이 빈칸입니다!");
        } else {
            await db.collection("comments").insertOne({
                parent_id: new ObjectId(req.params._id),
                writer_id: req.user._id,
                writer_name: req.user.username,
                content: req.body.comment,
            });

            res.redirect("/detail/" + req.params._id);
        }
    } catch (e) {
        res.send(e);
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

        if (result.user.equals(req.user._id)) {
            res.render("edit.ejs", { post: result });
        } else {
            res.send("본인이 작성한 글 아님");
        }
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
        await db.collection("post").deleteOne({
            _id: new ObjectId(req.query.id),
            user: new ObjectId(req.user._id),
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("DB Error!");
    }
});

// 회원가입
app.get("/sign-up", (req, res) => {
    res.render("sign-up.ejs");
});

app.post("/sign-up", checkBlankOfLoginInput, async (req, res) => {
    const id = req.body.username,
        pw = req.body.password,
        cpw = req.body.confirmPassword;
    let result = await db.collection("user").findOne({ username: id });
    let hashPw = await bcrypt.hash(id, 10);

    console.log(hashPw);

    if (id == "") {
        res.send("id가 빈칸임");
    } else if (pw == "") {
        res.send("password가 빈칸임");
    } else if (pw != cpw) {
        res.send("password가 다름");
    } else {
        if (result == null) {
            db.collection("user").insertOne({ username: id, password: hashPw });
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
});

app.get("/chat/create", async (req, res) => {
    try {
        let writer = await db
            .collection("user")
            .findOne(
                { _id: new ObjectId(req.query.writer_id) },
                { _id: 1, username: 1, password: 0 }
            );

        let result = await db.collection("chatting_room").findOne({
            members: { $all: [req.user._id, writer._id] },
        });

        console.log(result);

        if (!result) {
            result = await db.collection("chatting_room").insertOne({
                members: [req.user._id, writer._id],
                create_time: serverTime,
                members_name: [req.user.username, writer.username],
            });
        }

        res.render("chat.ejs", { data : result, user : req.user });
    } catch (e) {
        console.log(e);
    }
});

app.get("/chat-list", async (req, res) => {
    if (!req.user) {
        return;
    }

    let list = await db
        .collection("chatting_room")
        .find({ members: { $in: [req.user._id] } })
        .toArray();

    console.log(list);

    res.render("chat-list.ejs", { chatList: list, user: req.user });
});

app.get("/chat/:chat_id", async (req, res) => {
    try {
        let chattingRoom = await db
            .collection("chatting_room")
            .findOne({ _id: new ObjectId(req.params.chat_id) });

        let chatLog = await db.collection("chat").find({
            chatting_room_id : chattingRoom._id
        }).toArray();

        if (!chatLog) chatLog = [];

        if (chattingRoom.members.find((item) => item.equals(req.user._id))) {
            res.render("chat.ejs", { data : chattingRoom, chat : chatLog,  user : req.user });
        } else {
            res.send("돌아가라");
        }
    } catch (e) {
        console.log(e);
    }
});

io.on("connection", (socket) => {
    socket.on("ask-join", async (room) => {
        socket.join(room);
    });

    socket.on("send-msg", async (data) => {
        await db.collection("chat").insertOne({
            date : new Date(),
            chatting_room_id : new ObjectId(data.room),
            content : data.msg,
            writer_id : new ObjectId(data.writerId)
        });
        io.to(data.room).emit("broadcast", { msg : data.msg, userId : new ObjectId(data.writerId) });
    });
});

app.get("/stream/list", (req, res) => {
    res.writeHead(200, {
        "Connection" : "keep-alive",
        "Content-Type" : "text/event-stream",
        "Cache-Control" : "no-cache",
    });

    // 형식 그대로 맟춰야 됨
    res.write("event: msg\n");
    res.write("data: Hi\n\n");
})