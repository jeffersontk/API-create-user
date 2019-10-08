const mongoose = require('mongoose');
const Schema = mongoose.Schema
//criando o usuario no banco
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    }

});

 mongoose.model('user', UserSchema)