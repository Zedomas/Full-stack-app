const express = require('express')
const bars = express.Router()
const chicagoBars = require('../models/bars.js')
const neighborhoods = ['Rogers Park', 'West Ridge', 'Uptown', 'Lincoln Square', 'North Center', 'Lake View', 'Lincoln Square', 'Near Noth Side', 'Edison Park', 'Norwood Park', 'Jefferson Park', 'Forest Glen', 'North Park', 'Albany Park', 'Portage Park', 'Irving Park', 'Dunning', 'Montclare', 'Belmont Cragin', 'Hermosa', 'Avondale', 'Logan Square', 'Humboldt Park', 'West Town', 'Austin', 'Near West Side', 'Lower West Side', 'Loop', 'Near South Side', 'Armour Square'];


// Index route
bars.get('/', (req, res) => {
    chicagoBars.find({}, (errors, allBars) => {
        res.render('index.ejs', {
            Bars: allBars
        })
    })
})

// new Bar route
bars.get('/new', (req, res) => {
    chicagoBars.find({}, (errors, allBars) => {
        res.render('newbar.ejs', {
            Bars: allBars,
            neighborhoods
        })
    })
})

bars.post('/', (req, res) => {
    chicagoBars.create(req.body, (err, newBar)=> {
        res.redirect('/bars')
    })

})

// show bar route
bars.get('/:id', (req, res) => {
    chicagoBars.findById(req.params.id, (err, bar) => {
        res.render('showbars.ejs', {
            bar
        })
    })
})


// edit bar route
bars.get('/edit/:id', (req, res) => {
    chicagoBars.findById(req.params.id, (err, bar) => {
        res.render('edit.ejs', {
            bar,
            neighborhoods
        })
    })
})

// delete bar route
bars.delete('/:id', (req, res) => {
    chicagoBars.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/bars')
    })
})


module.exports = bars