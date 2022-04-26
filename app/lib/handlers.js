const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() })

// custom 404 page
exports.notFound = (req, res) => res.render('404')

// custom 500 page
// Express can distinguish between 404 and 500 by the number of arguments in the callback function
exports.serverError = (err, req, res, next) => res.render('500')