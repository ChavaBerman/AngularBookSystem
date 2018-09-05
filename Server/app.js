const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const basePath = path.join(__dirname + "/dist");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.get(`/`, (req, res) => {
    let linkList = "";
    let resPage=fs.readFileSync("links.html","utf-8");
   console.log(resPage);
    fs.readdir(basePath, (err, files) => {
        files.forEach((file) => {
            linkList += `<li><a href="/${file}" target="blank">${file}</a></li>`;
        })
        res.send(resPage.replace("placeHolder", linkList));
    });

});

fs.readdir(basePath, (err, files) => {
    files.forEach((file) => {
        app.use(express.static(`${basePath}/${file}`));
        app.get(`/${file}`, (req, res) => {
            res.sendFile(`${basePath}/${file}/index.html`);
        });
    })
});
app.get("/api/login", (req, res) => {
    let usersList = require('./user.json');
    let user = usersList.find(p => p.username == req.query['username'] && p.password == req.query['password']);
    console.log(usersList[0].username);
    console.log(user);
    res.send(user);

});
app.post("/api/register", (req, res) => {

    let isvalidUser = true;

    console.log(req.body);
    //check first name:
    if (req.body["firstname"].length > 15 || req.body["firstname"].length < 2 || !req.body["firstname"].match(/[a-z]/i))
        isvalidUser = false;

    //check last name:
    if (req.body["lastname"].length > 15 || req.body["lastname"].length < 2 || !req.body["lastname"].match(/[a-z]/i))
        isvalidUser = false;
    //check user name:
    if (req.body["username"].length > 15 || req.body["username"].length < 3 || !req.body["username"].match(/[a-z]/i))
        isvalidUser = false;
    //check password:
    if (req.body["password"].length > 10 || req.body["password"].length < 5)
        isvalidUser = false;
    //check duplicate users
    let usersList = require('./user.json');
    let user = usersList.find(p => p.username == req.body['username'] && p.password == req.body['password']);
    if (user) {
        res.status(200).send(null);
        return;
    }
    if (isvalidUser == true) {
        usersList.push(req.body);
        fs.writeFileSync("user.json", JSON.stringify(usersList));
        res.status(201).send(req.body);
    }
    else res.status(400).send();

})



const port = process.env.PORT || 3500;
app.listen(port, () => { console.log(`OK`); });

