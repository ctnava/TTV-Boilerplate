require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const { mode, devrig } = JSON.parse(fs.readFileSync("./api/env.json"));
var url = (mode === "development") ? (
    devrig ? "https://localhost:8080" : "http://localhost:8080"
    ) : ("https://www.twitch.tv/");


const pubDir = "./temp";
const pathToReports = pubDir + "/reports.json";
if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir);

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: url}));
app.use('/temp', express.static('temp'));
const port = process.env.BACKEND_PORT;
app.listen(port ,()=>{console.log("Server Started on Port:" + port)});
app.get('/', (req, res)=>{res.json("Hello, welcome to my back end! Now git out.")});


const falsy = ["",{},0,false,null,undefined];
const invalidData=(data)=>{return(falsy.includes(data)||falsy.includes(data.auth)||falsy.includes(data.auth.token)||falsy.includes(data.timestamp))}
const invalidHeader=(headers, auth)=>{return (falsy.includes(headers.authorization)||headers.authorization!==`Bearer ${auth.token}`)}
const syntheticAuth = {token:process.env.BACKEND_SECRET};
const defaultArchive = {archive:[]};


app.route('/bad_actor')
.post((req, res) => {
    const { body, headers } = req;
    if (invalidData(body)){console.log('INVALID_BODY');res.json('INVALID_BODY');return}
    if (invalidHeader(headers, body.auth)){console.log('INVALID_HEADERS');res.json("INVALID_HEADERS");return}
    if (!body.reportType) {res.json('INVALID_REPORT'); return}

    var reports = defaultArchive;
    if (fs.existsSync(pathToReports)) reports = JSON.parse(fs.readFileSync(pathToReports));
    reports.archive.push(body);

    fs.writeFileSync(pathToReports, JSON.stringify(reports, null, 2));
    res.json('ok');
})
.get((req, res) => {
    if (fs.existsSync(pathToReports)) {
        const reports = JSON.parse(fs.readFileSync(pathToReports));

        console.log(req.data);
        res.json(reports);
    } else res.json(defaultArchive);
})
.put((req, res) => {
    const { data, headers } = req;
    if (invalidData(data)){console.log('INVALID_DATA');res.json('INVALID_DATA');return}
    if (invalidHeader(headers, data.auth)){console.log('INVALID_HEADERS');res.json("INVALID_HEADERS");return}
    
    console.log(req.data);
    res.json('ok');
})
.patch((req, res) => {
    const { data, headers } = req;
    if (invalidData(data)){console.log('INVALID_DATA');res.json('INVALID_DATA');return}
    if (invalidHeader(headers, data.auth)){console.log('INVALID_HEADERS');res.json("INVALID_HEADERS");return}

    console.log(req.data);
    res.json('ok');
})
.delete((req, res) => {
    const { data, headers } = req;
    if (invalidData(data)){console.log('INVALID_DATA');res.json('INVALID_DATA');return}
    if (invalidHeader(headers, data.auth)){console.log('INVALID_HEADERS');res.json("INVALID_HEADERS");return}
    
    fs.unlinkSync(pathToReports);
    res.json('ok');
});