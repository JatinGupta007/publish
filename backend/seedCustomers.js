const SignUpModel = require('./Models/signupModels');

const customerData = [
    {
        email: "sshivang948@gmail.com",
        password: "12345",
        username: "Shivang Sharma",
        isManager: false
    },
    {
        email: "khushi@gmail.com",
        password: "12345",
        username: "Khushi",
        isManager: false
    },
    {
        email: "shivang123@gmail.com",
        password: "12345",
        username: "Shivang",
        isManager: false
    },
    {
        email: "shivang12@gmail.com",
        password: "12345",
        username: "shiv",
        isManager: false
    }
];

async function seedCustomers() {
    try {
        // Clear existing customers (but not managers)
        await SignUpModel.deleteMany({ isManager: false });
        console.log('Cleared existing customers');

        // Insert new customers
        await SignUpModel.insertMany(customerData);
        console.log('Successfully seeded customer data');
    } catch (error) {
        console.error('Error seeding customers:', error);
    }
}

module.exports = seedCustomers;
