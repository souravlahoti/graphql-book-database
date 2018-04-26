const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://graphqlproject:password@ds159509.mlab.com:59509/graphqlproject');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("mLab is connected");
});

module.exports = db;