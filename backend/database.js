const mongoose = require('mongoose');

const URI = 'mongodb://localhost/tp-backend-2019';

mongoose.connect(URI, err => {
    if(!err){
        console.log('DB conectada');
    } 
    else {
        console.log(err);
    }
});

module.exports = mongoose;