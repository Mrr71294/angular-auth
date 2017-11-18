const express =require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const username = req.body.username; //username from the user model (schema) = username from the form that user fills
  const password = req.body.password;

  if(!username || !password) {
    res.status(400).json({ message: 'Provide usernbame and password'});
    return ;
  }
  //See if the username is already taken(query the database)
  User.findOne({ username : username}, '_id', (err, foundUser) => {
    if(foundUser) {
      res.status(400).json({message: 'That username already exists.'});
      return ;
    }
    //save the user to the database if its avalible
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username: username,
      password: hashPass
    });
    theUser.save((err) => {
      if (err) {
        res.status(500).json({message: 'something went wrong'});
        return;
      }
      req.login(theUser, (err) => {
        res.status(200).json(theUser);
        return ;
      });
    });//theUser.save
  });//user.findOne()
});//Post/signup

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  //see if the username credential is saveUninitialized
  User.findOne({username:username}, (err, foundUser) => {
    //send error if no user with that Username
    if (foundUser === null){
      res.status(400).json({message: 'Incorrect username'});
      return;
    }
    //send an error if password is wrong
    if(!bcrypt.compareSync(password, foundUser.password)) {
      res.status(400).json({ message: 'Incorrect password'});
      return;
    }
    //if we get here we are good
    req.login(foundUser, (err) => {
      res.status(200).json(foundUser);
    });
  });//User.findOne()
});//Post/login



module.exports = router;
