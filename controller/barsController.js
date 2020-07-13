const express = require('express')
const bars = express.Router()
const chicagoBars = require('../models/bars.js')
const neighborhoods = ['Rogers Park', 'West Ridge', 'Uptown', 'Lincoln Square', 'North Center', 'Lake View', 'Lincoln Square', 'Near Noth Side', 'Edison Park', 'Norwood Park', 'Jefferson Park', 'Forest Glen', 'North Park', 'Albany Park', 'Portage Park', 'Irving Park', 'Dunning', 'Montclare', 'Belmont Cragin', 'Hermosa', 'Avondale', 'Logan Square', 'Humboldt Park', 'West Town', 'Austin', 'Near West Side', 'Lower West Side', 'Loop', 'Near South Side', 'Armour Square'];

//authenticator

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next();
    } else {
      res.redirect('/sessions/new');
    }
}



// Index route
bars.get('/', (req, res) => {
    chicagoBars.find({}, (errors, allBars) => {
        res.render('index.ejs', {
            Bars: allBars,
            currentUser: req.session.currentUser
        })
    })
})

// new Bar route
bars.get('/new', isAuthenticated, (req, res) => {
    chicagoBars.find({}, (errors, allBars) => {
        res.render('newbar.ejs', {
            Bars: allBars,
            neighborhoods,
            currentUser: req.session.currentUser
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
            bar,
            currentUser: req.session.currentUser
        })
    })
})

// write review bar route
bars.get('/:id/review', (req, res) => {
    chicagoBars.findById(req.params.id, (err, bar) => {
        res.render('review.ejs', {
            bar,
            currentUser: req.session.currentUser
        })
    })
})

// write review bar route
bars.put('/review/:id', (req, res) => {
    chicagoBars.findById(req.params.id, (err, bar) => {
        
        if (req.body.star1 == 'on') {
            rating = 1
        } else if (req.body.star2 == 'on') {
            rating = 2
        } else if (req.body.star3 == 'on') {
            rating = 3
        } else if (req.body.star4 == 'on') {
            rating = 4
        } else if (req.body.star5 == 'on') {
            rating = 5
        }
    
        let newReview = {
            username: req.body.user,
            body: req.body.review,
            rating
        }
        oldReview = bar.reviews

        oldReview.push(newReview)
        console.log(oldReview)
        chicagoBars.findByIdAndUpdate(req.params.id, {reviews: oldReview}, {new: true, useFindAndModify: false}, (error, reviewedBar) => {
            console.log(reviewedBar)
            res.redirect('/bars/' + req.params.id)
        })
    })    
})

// remove review route

// bars.put('/reviews/:id/:index', (req, res) => {

// })

// edit bar route
bars.get('/edit/:id', isAuthenticated, (req, res) => {
    chicagoBars.findById(req.params.id, (err, bar) => {
        res.render('edit.ejs', {
            bar,
            neighborhoods,
            currentUser: req.session.currentUser
        })
    })
})

//Update route
bars.put('/:id', (req, res) => {
    console.log('updating')
    chicagoBars.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false}, (error, editedBar) => {
        console.log(req.body)
        res.redirect('/bars/' + req.params.id)
    })
})

// delete bar route
bars.delete('/:id', (req, res) => {
    chicagoBars.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/bars')
    })
})


module.exports = bars