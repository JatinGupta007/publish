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
    const { email } = req.body;

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
    const admin = await signupModels.create(req.body);

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
      value: admin
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "error",
      error: "Internal server error"
    });
  }
});



module.exports = signupRoute;
