const mongoose =require('mongoose');

signupSchema = mongoose.Schema({
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

signupModels = mongoose.model('signup',signupSchema);

module.exports = signupModels;