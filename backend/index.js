const express = require('express');
const mongoose = require('mongoose');
const port =process.env.PORT || 5000;
const cors = require('cors');
const signupRoute = require('./Routes/SignupRoute');
const loginRoute = require('./Routes/loginRoute');
const contactRoute = require('./Routes/ContactRoute');
const managerRoute = require('./Routes/managerRoute');
const menuItemRoute = require('./Routes/menuItemRoute');
const orderRoute = require('./Routes/orderRoute');
const checkoutRoute = require('./Routes/CheckoutRoute');
const url =
    "mongodb+srv://Jatin:jatin123@cluster0.ut6taig.mongodb.net/ecommerce?appName=Cluster0";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/signup',signupRoute);
app.use('/api/login',loginRoute);
app.use('/api/contact',contactRoute);
app.use('/api/manager', managerRoute);
app.use('/api/menu', menuItemRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', checkoutRoute);


const seedDatabase = require('./seedData');
const seedCustomers = require('./seedCustomers');
const seedOrders = require('./seedOrders');
const seedManager = require('./seedManager');

mongoose.connect(url)
.then(async () => {
    console.log("Mongoose connect successfully");
    // Seed the database with initial menu items, customers and orders
    await seedDatabase();
    await seedCustomers();
    await seedManager();
    await seedOrders();
})
.catch((err)=>console.log(`Error: ${err}`));



app.listen(port, ()=>console.log(`Server is running port ${port}`));