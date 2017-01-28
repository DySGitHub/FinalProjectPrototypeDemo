var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String, //Hash created from password
    created_at: {
        type: Date,
        default: Date.now
    }
});

var postSchema = new mongoose.Schema({
    text: String,
    username: String,
    brand: String,
    type: String,
    sale: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

//declare a model called User which has a schema userSchema
mongoose.model('User', userSchema);
//declare a model called post which has a schema postSchema
mongoose.model('Post', postSchema);
