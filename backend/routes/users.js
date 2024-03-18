const express = require('express');
const router = express.Router();
const User = require('../models/users');

// get all users
router.get('/', async(req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
});

// post one user - register
router.post('/register', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    })
    await newUser.save();
    res.send(newUser);
});


module.exports = router;