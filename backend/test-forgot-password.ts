import axios from 'axios';

async function testForgotPassword() {
  try {
    console.log('Testing forgot-password endpoint...');

    // Replace with a real email from your database
    const response = await axios.post('http://localhost:5000/forgot-password', {
      email: 'test@example.com'  // This email exists in the database
    }, {
      timeout: 10000
    });

    console.log('Status:', response.status);
    console.log('Response:', response.data);

    // If reset link is included in response, log it
    if (response.data.resetLink) {
      console.log('\n🔗 Reset Link:', response.data.resetLink);
    }

  } catch (error: any) {
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    console.log('Error message:', error.message);
  }
}

async function testEmail() {
  try {
    console.log('\nTesting email configuration...');

    const response = await axios.post('http://localhost:5000/test-email', {
      email: 'test@example.com'  // Use a real email for testing
    }, {
      timeout: 10000
    });

    console.log('Email test result:', response.data);

  } catch (error: any) {
    console.log('Email test error:', error.response?.data || error.message);
  }
}

// Run tests
testForgotPassword().then(() => testEmail());