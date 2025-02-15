const http = require('http');
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
    response.writeHead(404);
    response.end("404: Not Found");
};

server.listen(process.env.PORT || port);