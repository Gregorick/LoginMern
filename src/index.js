const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const path = require('path');
const app = express();
const {mongoose} =  require('./database');
const passport = require('./passport/local-auth');
const session = require('express-session');
const flash = require('connect-flash');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Middewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
     saveUninitialized: false
 }));
 app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});
// Routes
app.use('/', require('./routes/index'));

// Inicializando el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor conectado en el puerto ${app.get('port')}`)
});