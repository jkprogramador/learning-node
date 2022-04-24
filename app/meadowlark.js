const express = require('express')

const app = express()

const port = process.env.NODE_PORT || 3000

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})

// custom 404 page
// app.use is the method by which Express adds middleware
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

// custom 500 page
// Express can distinguish between 404 and 500 by the number of arguments in the callback function
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Internal Server Error')
})

app.listen(port, () => console.log(`Express started on http://localhost:${port}`))