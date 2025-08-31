import { readFileSync } from 'fs'
import http from 'http'
import url from 'url'


const data = readFileSync('./data/products.json', 'utf-8')
const products = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url
    if (pathName === '/' || pathName === '/home') {
        res.writeHead(200, { 'content-type': 'text/plain' })
        res.end('Welcome to the products API')
    } else if (pathName === '/api/products') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(products))
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.end('<h1>Page Not Found, sorry sorry</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("lISTENING TO REQ ON PORT 8000")
})