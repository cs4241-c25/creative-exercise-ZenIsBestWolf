"use strict";

import mime from 'mime';
import http from 'http';
import fs from 'fs';

const port = 8080;

const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        handleGet(request, response);
    }
});

const handleGet = (request, response) => {
    if (!request.url) {
        console.error("Request does not contain a URL.");
        return;
    }
    if (request.url === "/") {
        sendFile(response, "public/index.html");
        return;
    }
    const filename = "public/" + request.url.slice(1);
    sendFile(response, filename);
};

const sendFile = (response, filename) => {
    const type = mime.getType(filename);
    if (type === null) {
        console.error("No type found");
        return;
    }
    fs.readFile(filename, (err, content) => {
        // if the error = null, then we've loaded the file successfully
        if (err === null) {
            // status code: https://httpstatuses.com
            response.writeHead(200, 'OK', { "content-type": type });
            response.end(content);
        }
        else {
            // file not found, error code 404
            response.writeHead(404);
            response.end("404: File Not Found");
        }
    });
};

server.listen(process.env.PORT || port);