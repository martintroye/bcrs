const mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true}
});

module.exports = mongoose.model('Role', roleSchema);