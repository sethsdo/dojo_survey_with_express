
const express = require("express")
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({ secret: 'expresspasskey' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    if(!req.session.name) {
        req.session.name = '';
    }
    if (!req.session.location) {
        req.session.location = '';
    }
    if (!req.session.language) {
        req.session.language = '';
    }
    if (!req.session.comment) {
        req.session.comment = '';
    }
    context = {
        "name": req.session.name,
        "location": req.session.location,
        "language": req.session.language,
        "comment": req.session.comment,
    }
    res.render('index')
})

app.post("/user", function (req, res) {
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;

    res.redirect("/userInfo");
})

app.get("/userInfo", function (req, res) {
    context = {
        "name": req.session.name,
        "location": req.session.location,
        "language": req.session.language,
        "comment": req.session.comment,
    }
    res.render('user', context);
})

app.get('/back', function (req, res) {
    req.session.destroy();
    res.redirect('/')
});

app.listen(8000, function () {
    console.log("listening on port 8000");
});

