import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
const app : Application = express();

app.use(cors({
    origin : "*"
}));

const server : http.Server = http.createServer(app);
const PORT : number = Number(process.env.PORT || 8080)

app.get('/health', (req : Request, res : Response)=> {
    res.send("Ok");
})

server.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
    
})