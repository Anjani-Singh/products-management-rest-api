
// Function to generate a unique username based on the given username
async function generateUniqueUsername(username, fetchExistingUserQuery) {
  try {
    let uniqueUsername = username.toLowerCase().replace(/\s+/g, ''); // Convert to lowercase and remove spaces
    // Check if the username already exists in the database
    const existingUser = await fetchExistingUserQuery(uniqueUsername)
    if (existingUser.length > 0) {
      // If the username already exists, append a number to make it unique
      let counter = 1;
      while (true) {
        const newUsername = uniqueUsername + counter;
        const userWithNewUsername = await fetchExistingUserQuery(newUsername)
        if (userWithNewUsername.length === 0) {
          uniqueUsername = newUsername;
          break;
        }
        counter++;
      }
    }
    return uniqueUsername;
  } catch (error) {
    console.error('Error in generating unique username:', error);
    throw error;
  }
}

// Function to generate a random temporary password
function generateTemporaryPassword() {
  try {
    const length = 10;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let temporaryPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      temporaryPassword += charset[randomIndex];
    }
    return temporaryPassword;
  } catch (error) {
    console.error('Error in generating temporary password:', error);
    throw error;
  }
}

// Now we can use log instead of console.log
const log = (...args) => {
  console.log(...args);
};

// Define a mapping between role IDs and their corresponding names
const roleNames = {
  1: 'Super Admin',
  2: 'Admin',
  3: 'User'
};

// Function to get the role name based on the role ID
const getRoleName = (roleId) => {
  try {
    return roleNames[roleId] || 'Unknown Role';
  } catch (error) {
    console.error('Error in getting role name:', error);
    throw error;
  }
};




module.exports = {
  generateUniqueUsername,
  generateTemporaryPassword,
  log,
  getRoleName
}