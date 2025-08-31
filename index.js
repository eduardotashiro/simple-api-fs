import { readFileSync } from 'fs'
import http from 'http'
import url from 'url'


const data = readFileSync('./data/products.json', 'utf-8')
const products = JSON.parse(data)


const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)

    if (pathname === '/' || pathname === '/home') {
        res.writeHead(200, { 'Content-type': 'text/plain' })
        res.end('Welcome to the products API')

    } else if (pathname === '/api/products') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify(products))

    } else if (pathname === '/api/product') {
        const product = products.find(p => p.id == query.id)

        if (product) {
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(product))

        } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'Produto não encontrado' }))
        }

    } else if (pathname === '/api/products/search') {

        const searchTerm = query.name?.toLowerCase()

         if (!searchTerm) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'query "name" é obrigatório' }))
        
        return
    } 


      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm))


    if (filtered.length > 0) {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify(filtered))
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Nenhum produto encontrado' }))
    }

}  else {
    res.writeHead(404, { 'Content-type': 'text/html' })
        res.end('<h1>Page Not Found, sorry sorry</h1>')
}
})




server.listen(8000, '127.0.0.1', () => {
    console.log("lISTENING TO REQ ON PORT 8000")
})