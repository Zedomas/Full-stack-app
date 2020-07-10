const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');

const Users = require('../models/users.js');

userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    });
});

userRouter.post('/', (req, res) => {
    Users.find({username: req.body.username}, (errors, existingUsers) => {
        if(existingUsers.length > 0) {
            res.render('error.ejs', {
                error: "I'm sorry, that user already exist",
                currentUser: req.session.currentUser
            })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            // console.log(req.body);
            Users.create(req.body, (err, createdUser) => {
                req.session.currentUser = createdUser;
                res.redirect('/bars');
            }); 
        }
    })

});

module.exports = userRouter;
