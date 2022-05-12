require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());
const port = process.env.BACKEND_PORT;
app.listen(port ,()=>{console.log("Server Started on Port:" + port)});
app.get('/', (req, res)=>{res.json("Hello, welcome to my back end! Now git out.")});


const syntheticAuth = { token:process.env.BACKEND_SECRET };
const invalidBody = (body) => {return (body === {} || !body.auth || !body.timestamp)}
const invalidHeader = (headers, auth) => {
    return (
        !headers["Authorization"] || !auth || !auth.token ||
        headers["Authorization"] !== `Bearer ${auth.token}`
    );
}


const pathToReports = "./api/reports.json";
const defaultArchive = { archive:[] };
app.route('/bad_actor')
.post((req, res) => {
    if (invalidBody(req.body)) {res.json('INVALID_BODY'); return}
    if (invalidHeader(req.headers, req.body.auth)) {res.json("INVALID_HEADERS"); return}

    if (!req.body.reportType) {res.json('INVALID_REPORT'); return}
    const report = req.body;

    var reports = defaultArchive;
    if (fs.existsSync(pathToReports)) reports = JSON.parse(fs.readFileSync(pathToReports));
    reports.archive.push(report);

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
    if (invalidBody(req.data)) {res.json('INVALID_BODY'); return}
    if (invalidHeader(req.headers, req.data.auth)) {res.json("INVALID_HEADERS"); return}
    
    console.log(req.data);
    res.json('ok');
})
.patch((req, res) => {
    if (invalidBody(req.data)) {res.json('INVALID_BODY'); return}
    if (invalidHeader(req.headers, req.data.auth)) {res.json("INVALID_HEADERS"); return}

    console.log(req.data);
    res.json('ok');
})
.delete((req, res) => {
    if (invalidBody(req.data)) {res.json('INVALID_BODY'); return}
    if (invalidHeader(req.headers, syntheticAuth)) {res.json("INVALID_HEADERS"); return}
    
    fs.unlinkSync(pathToReports);
    res.json('ok');
});