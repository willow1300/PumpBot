const { v4: uuidv4 } = require('uuid');  // Import the v4 function to generate a UUID

const PRIVATE_KEY = 'myFisrtAndLastEnd1300';  // Use your private key
const licenseData = {
    info: {
        name: 'User Name',
        email: 'user@example.com',
        trial: '10-minutes',  // Trial information
    },
    prodCode: 'BOT123',
    appVersion: '1.0',
};

// Generate the license key using UUID
function createLicenseKey() {
    try {
        const licenseKey = uuidv4();  // Generate a unique license key
        console.log('Generated License Key:', licenseKey);
    } catch (error) {
        console.error('Error generating license key:', error.message);
    }
}

// Execute the function to generate the key
createLicenseKey();
