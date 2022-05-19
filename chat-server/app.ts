import express, { Request, Response, NextFunction, response } from "express";
import http from  "http";
import WebSocket from "ws";
import testResponses from "./src/chat/test-responses.json";

const app = express();
const port = 3030;

const server = http.createServer(app);
const socketServer = new WebSocket.Server({server});

server.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${(<any>server.address()).port}`);
});

interface TestResponse {
    message: string;
    port: number;
    timeStamp: string;
}

app.get("/test", (request: Request, response: Response, next: NextFunction) => {
    let testResponse: TestResponse = {
        message: "Server up and running",
        port: port,
        timeStamp: new Date().toDateString()
    };

    response.status(200).json(testResponse);
});

app.get("/responses", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(testResponses);
});

socketServer.on("connection", (ws: WebSocket) => {

    ws.on("message", (message: string) => {
        console.log(`received ${message}`);
        ws.send(`Hello, you sent => ${message}`);
    });

    ws.send("Hi there, I am a WebSocket server");
});

let messageIndex = 0;

setInterval(() => {
    broadcast(testResponses[messageIndex++]);
    if (messageIndex > testResponses.length)
        messageIndex = 0;
}, 3000);

function broadcast(message: string): void {
    for (let client of socketServer.clients) {
        if (client.readyState === WebSocket.CLOSED) continue;

        client.send(message);
    }
}