const express = require('express');
const router = express.Router();
const passport = require('passport');

router.route('/')
      .get( (req, res, next ) => {
        res.render('index');
      }) 
router.route('/signup')
      .get((req, res, next) => {
        res.render('signup')
      })
      .post(passport.authenticate('local-signup', {
         successRedirect: '/profile',
         failureRedirect: '/signup',
         passReqToCallback: true
      }));     
      
router.route('/signin')  
      .get((req, res, next) => {
        res.render('signin')
      })
      .post(passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
      }))   
   
router.route('/logout')
      .get((req, res, next) => {
        req.logout();
        res.redirect('/')
      });

router.use((req, res, next) => {
  isAuthenticated(req, res, next);
  next();
});      

router.get('/profile', (req, res, next) => {
     res.render('profile');
})     

function isAuthenticated(req, res, next) {
  if ( req.isAuthenticated() ) {
    return next();
  }
  res.redirect('/signin');
};


  module.exports = router; 