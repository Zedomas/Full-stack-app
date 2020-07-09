const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users')
const sessionRouter = express.Router()

sessionRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })

})

sessionRouter.post('/', (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        console.log(foundUser)
        if (!foundUser) {
            res.send('<a href="/users/new">Sorry user not found</a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/bars')
            } else {
                res.send('<a href="/users/new">Sorry password doesnt match</a>')
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