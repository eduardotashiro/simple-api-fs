import { readFileSync } from 'fs';
import http from 'http'


const data = readFileSync("./data/products.json")
const dataObject = JSON.parse(data)

const server = http.createServer((req, res) =>{
    res.end( "Server ON")
})

server.listen(8000,"127.0.0.1", () =>{
    console.log("lISTENING TO REQ ON PORT 8000")
})