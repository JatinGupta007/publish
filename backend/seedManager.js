const SignUpModel = require('./Models/signupModels');

const managerData = [
    {
        email: "manager@gmail.com",
        password: "manager@123",
        username: "Canteen Manager",
        isManager: true,
        role: "manager" // Adding an extra role field for clarity
    }
];

async function seedManager() {
    try {
        const managerAccount = await SignUpModel.findOneAndUpdate(
            { email: "manager@gmail.com" },
            {
                $setOnInsert: {
                    email: "manager@gmail.com",
                    password: "manager@123",
                    username: "Canteen Manager",
                    isManager: true,
                    role: "manager"
                }
            },
            { upsert: true, new: true }
        );

        if (managerAccount) {
            console.log('Successfully created manager account:', {
                email: managerAccount.email,
                isManager: managerAccount.isManager,
                role: managerAccount.role
            });
        }

        // Verify the manager account
        const verifyManager = await SignUpModel.findOne({ email: "manager@gmail.com" });
        if (verifyManager && verifyManager.isManager) {
            console.log('Verified manager account exists with correct permissions');
        } else {
            console.error('Manager account verification failed');
        }
    } catch (error) {
        console.error('Error seeding manager:', error);
    }
}

module.exports = seedManager;
