import http from 'http'

const port = process.env.NODE_PORT || 3000
const server = http.createServer((req, res) => {

    // Normalize URL by removing querystring, optional trailing slash and making it lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

    switch (path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Homepage')
            break
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('About')
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
            break
    }
})

server.listen(port, () => console.log(`server started on port ${port}`))