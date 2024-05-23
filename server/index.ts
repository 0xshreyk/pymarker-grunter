import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
const app : Application = express();

app.use(cors({
    origin : "*"
}));
app.use(express.json());
app.use(express.text());

const server : http.Server = http.createServer(app);
const PORT : number = Number(process.env.PORT || 8080)
app.get('/api/health', async (req : Request, res : Response)=> {
    res.send("Ok");
})
app.post('/api/run', async (req : Request, res : Response)=> {
    const body = req.body;
    const code : string = body.code;
    const output = await (await fetch('http://localhost:8000', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            Code : code
        })
    })).text()
    res.status(200).send(output);
})
server.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
    
})