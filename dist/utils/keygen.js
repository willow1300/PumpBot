"use strict";

var _require = require('uuid'),
  uuidv4 = _require.v4; // Import the v4 function to generate a UUID

var PRIVATE_KEY = 'myFisrtAndLastEnd1300'; // Use your private key
var licenseData = {
  info: {
    name: 'User Name',
    email: 'user@example.com',
    trial: '10-minutes' // Trial information
  },
  prodCode: 'BOT123',
  appVersion: '1.0'
};

// Generate the license key using UUID
function createLicenseKey() {
  try {
    var licenseKey = uuidv4(); // Generate a unique license key
    console.log('Generated License Key:', licenseKey);
  } catch (error) {
    console.error('Error generating license key:', error.message);
  }
}

// Execute the function to generate the key
createLicenseKey();