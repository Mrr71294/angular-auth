const passport = require('passport');
const User = require('../models/user-model');


//Saves user ID in the session
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

//retrieve the full user details from database using ID, (user is stored in the session)
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
      cb(null, userDocument);
  });
});
