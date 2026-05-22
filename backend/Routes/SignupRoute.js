const express = require('express');
const signupRoute = express.Router();
const signupModels = require('../Models/signupModels');
const { sendWelcomeEmail } = require('../utils/emailService');

signupRoute.get('/',async(req,res)=>{
    const admin = await signupModels.find();
    res.json({"msg":"success","value":admin});
});

signupRoute.post('/', async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const username = req.body.username?.trim() || email?.split('@')[0];

    if (!email || !password || !username) {
      return res.status(400).json({
        msg: "error",
        error: "Name, email, and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await signupModels.findOne({ email });
    if (existingUser) {
      // Send 409 Conflict for duplicate email
      return res.status(409).json({
        msg: "error",
        error: "Email already exists"
      });
    }

    // Create new user
    const admin = await signupModels.create({
      email,
      password,
      username,
      isManager: false
    });

    // Send welcome email
    try {
      await sendWelcomeEmail({
        email: admin.email,
        username: admin.username || admin.email.split('@')[0]
      });
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      msg: "success",
      value: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        isManager: admin.isManager
      }
    });

  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        error: "Email already exists"
      });
    }
    res.status(500).json({
      msg: "error",
      error: "Internal server error"
    });
  }
});



module.exports = signupRoute;
