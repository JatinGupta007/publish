const express =require('express');
const loginRoute = express.Router();
const signupModel = require('../Models/signupModels')

loginRoute.get('/',async(req,res)=>{
    admin = await signupModel.find();
    res.json({"msg":"success","value":admin});
});

loginRoute.post('/', async(req,res) => {
    try {
        const { email, password } = req.body;
        const user = await signupModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                msg: "not_found",
                error: "Account not found"
            });
        }

        // Check if this is a manager trying to use customer login
        if (user.isManager) {
            return res.status(401).json({
                msg: "unauthorized",
                error: "This is a manager account. Please use manager login."
            });
        }

        // Check password
        if (user.password === password) {
            return res.json({
                msg: "success",
                token: "customer-token"  // You may want to implement proper JWT tokens
            });
        } else {
            return res.status(401).json({
                msg: "Failed",
                error: "Invalid password"
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            msg: "error",
            error: "Internal server error"
        });
    }
});

// Route to check if user exists and get their type
loginRoute.post('/check-user', async(req,res)=>{
    try {
        const { email } = req.body;
        const user = await signupModel.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                msg: "not_found",
                error: "User not found"
            });
        }

        return res.json({
            msg: "success",
            isManager: user.isManager
        });
    } catch (error) {
        console.error('Check user error:', error);
        res.status(500).json({
            msg: "error",
            error: "Internal server error"
        });
    }
});

module.exports = loginRoute;