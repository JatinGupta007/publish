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
        for (const customer of customerData) {
            await SignUpModel.updateOne(
                { email: customer.email.toLowerCase() },
                { $setOnInsert: { ...customer, email: customer.email.toLowerCase() } },
                { upsert: true }
            );
        }
        console.log('Customer seed data ensured');
    } catch (error) {
        console.error('Error seeding customers:', error);
    }
}

module.exports = seedCustomers;
