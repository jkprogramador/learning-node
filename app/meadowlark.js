const express = require('express')

const expressHandlebars = require('express-handlebars')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.NODE_PORT || 3000

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

// custom 404 page
// app.use is the method by which Express adds middleware
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// custom 500 page
// Express can distinguish between 404 and 500 by the number of arguments in the callback function
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(`Express started on http://localhost:${port}`))