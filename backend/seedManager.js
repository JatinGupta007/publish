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
        // First, remove any existing manager account
        await SignUpModel.deleteOne({ email: "manager@gmail.com" });
        console.log('Cleared existing manager account');

        // Force create new manager account
        const managerAccount = await SignUpModel.create({
            email: "Manager@gmail.com",
            password: "manager@123",
            username: "Canteen Manager",
            isManager: true,
            role: "manager"
        });

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
