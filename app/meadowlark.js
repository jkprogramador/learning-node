const express = require('express')

const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.NODE_PORT || 3000

app.get('/', handlers.home)

app.get('/about', handlers.about)

// app.use is the method by which Express adds middleware
// Add static middleware. This will override other routes
// It has the same effect as creating a route for each static file
// The "public" directory is omitted when referencing files in HTML
app.use(express.static(__dirname + '/public'))

app.use(handlers.notFound)

app.use(handlers.serverError)

if (require.main === module) { // If running file directly with node, require.main equals global module ...
    app.listen(port, () => console.log(`Express started on http://localhost:${port}`))
} else {
    module.exports = app // otherwise it's being imported from another module
}