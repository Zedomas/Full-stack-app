const express = require('express')
const search = express.Router()
const chicagoBars = require('../models/bars.js')


//authenticator

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next();
    } else {
      res.redirect('/sessions/new');
    }
}



//search bar route
search.put('/searching', (req, res) => {
    chicagoBars.find({name: {$regex: req.body.name, $options: "i"}}, (err, foundBars) => {
        res.render('search.ejs', {
            currentUser: req.session.currentUser,
            Bars: foundBars
        })
    })
})

module.exports = search