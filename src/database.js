const mongoose = require('mongoose');
const { mongodb } = require('./keys');

const URI = mongodb.URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db => console.log('Conectado a la base de datos'))
        .catch(err => console.error(err));