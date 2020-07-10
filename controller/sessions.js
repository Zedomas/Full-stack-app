const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users')
const sessionRouter = express.Router()

sessionRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })

})

sessionRouter.post('/', (req, res) => {
    Users.findOne({ username: req.body.username}, (err, foundUser) => {
        console.log(foundUser)
        if (!foundUser) {
            res.render('error.ejs', {
                error: "Sorry user not found",
                currentUser: req.session.currentUser
            })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/bars')
            } else {
                res.render('error.ejs', {
                    error: "Sorry password doesnt match",
                    currentUser: req.session.currentUser
                })
            }
        }
    })
})

sessionRouter.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/bars');
    });
});

module.exports = sessionRouter;