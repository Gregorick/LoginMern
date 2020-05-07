const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done( null, user.id);
});
passport.deserializeUser( async (id, done) => {
  const user = await User.findById(id);
  done( null, user);
});

// Registrarse

passport.use('local-signup', new LocalStrategy({
// Decalarar las variables que se enviaran
usernameField: 'email',
passwordField: 'password',
passReqToCallback: true
}, async (req, email, password, done) => {
  // Validacion si el correo ya existe
 const eUser = await User.findOne({email: email});
 if (eUser) {
   return done(null, false, req.flash('signupMessage', 'El correo ya existe'));
 } else {
     // Agregarles la funcion    
     const user = new User();
     user.email = email;
     user.password = user.encryptPassword(password)
     await user.save();
     done(null, user);
 }
}));

// Logearse

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
   const user = await User.findOne({email:email})
   if (!user) {
      return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
   } 
    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta'));
    } 
    done(null, user);
 }))


module.exports = passport;