const mongoose = require('mongoose');
const signupModels = require('./Models/signupModels');

const url = "mongodb://127.0.0.1:27017/SmartCanteenUser";

const managerCredentials = {
    email: "manager_softpro@gmail.com",
    password: "manager@123"
};

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
        return signupModels.findOne({ email: managerCredentials.email });
    })
    .then((existingManager) => {
        if (existingManager) {
            console.log("Manager account already exists");
            return;
        }
        return signupModels.create(managerCredentials);
    })
    .then((result) => {
        if (result) {
            console.log("Manager account created successfully");
        }
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error:", err);
        mongoose.connection.close();
    });
