
const express = require('express');
const cors = require('cors');
const request = require('request');
const https = require('https');
const app = express();
require('dotenv').config();
app.use(cors());
// Using request for calling external api
app.get('/users', (req, resp) => {
    let page = req.query.page;
    request(`https://reqres.in/api/users?page=${page}`, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            return await resp.json(JSON.parse(body));
        }
    });
});

// Using https for calling external api
app.get('/getusers', (req, res) => {
    let page = req.query.page
    https.get(`https://reqres.in/api/users?page=${page}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.json(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

const port = process.env.port || 3000;
var server = app.listen(port, () => {
    console.log("server is listening at ", port)
})
