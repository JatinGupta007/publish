const mongoose =require('mongoose');

const signupSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    isManager: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const signupModels = mongoose.model('signup',signupSchema);

module.exports = signupModels;
