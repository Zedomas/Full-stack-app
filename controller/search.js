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


search.get('/results', (req, res) => {
    res.render('search.ejs', {
        currentUser: req.session.currentUser,
        Bars: [{
            img: [
              'https://images.squarespace-cdn.com/content/v1/546a0a98e4b05145d3fe756c/1416266299694-QXFNTFU3JCP1IGQROFP3/ke17ZwdGBToddI8pDm48kGwvRg9EcGTSiKW7o5b4-XUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc-p1Hp_56tYAjig2R0ufRNFOj3ziTySTApPUaEAw3JSgspzgVYkcTR8S4_lRoX4g3/Reno-patio-south---credit-luningphoto.com.jpg?format=2500w'
            ],
            _id: '5f05f5eb3c6bf54b74582eca',
            name: 'Reno',
            description: 'Wood-fired pizza, bagels & pasta in a casual, loftlike space with a bar for pastries & alcohol.',
            specials: 'Dollar Whiskey Shots',
            location: 'Rogers Park',
            barType: 'Dive',
            __v: 0
          }]
        })

})

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