const http = require('http');
const express = require("express");
const app = express();
const clientPath = `${__dirname}/build`;

app.use(express.static(clientPath));

const server = http.createServer(app);

server.listen(8080,()=>{
    console.log("Localhost:8080 started");
});