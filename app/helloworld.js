import http from 'http'
import fs from 'fs'
import { __dirname } from './constants.js'


function serveStaticFile(res, path, contentType, responseCode = 200) {
    // fs.readFile is an asynchronous method for reading files. Synchronous version is readFileSync
    // Provide a callback function to readFile
    // __dirname resolves to directory the executing script resides in. CommonJS global not available when using ES imports
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            return res.end('500- Internal Error')
        }

        res.writeHead(responseCode, { 'Content-Type': contentType })
        res.end(data)
    })
}

const port = process.env.NODE_PORT || 3000
const server = http.createServer((req, res) => {

    // Normalize URL by removing querystring, optional trailing slash and making it lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/foto.jpg':
            serveStaticFile(res, '/public/img/foto.jpg', 'image/jpg')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})

server.listen(port, () => console.log(`server started on port ${port}`))