const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModels = require('../models/userModels');

const util = require('../utils/util');
const { sendInvitationEmail } = require('./emailController');
const emailTemplates = require('./emailTemplates');
const constants = require("../utils/constants");
const statusMessage = constants.statusMessage();
const statusCode = constants.statusCode();

const dashboardLink = process.env.DASHBOARD_LINK || "https://dashboard.com";
const domain = process.env.EMAIL_SERVICE_URL || "doc.anjani15@gmail.com";


// Function to create a new user with a unique username and password
const createUser = async (req, res) => {
  try {
    const { username, email, role, createdBy } = req.body;

    // Check if the email already exists
    const isEmailExist = await userModels.isEmailExistQuery(email);
    if (isEmailExist.length > 0) {
      return res.status(statusCode['BAD_REQUEST']).json({ success: false, message: statusMessage['EMAIL_EXIST'] });
    }

    // Generate unique username based on the given username
    const uniqueUsername = await util.generateUniqueUsername(username, userModels.fetchExistingUserQuery);

    // Generate temporary password
    const temporaryPassword = util.generateTemporaryPassword();

    // Hash the temporary password before storing it in the database
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Insert user into the users table with the unique username and hashed password
    const userInsertion = await userModels.userInsertQuery(username, uniqueUsername, email, hashedPassword, role, createdBy)

    // Retrieve the user_id of the newly inserted user
    const user = await userModels.fetchUserId(uniqueUsername);
    const userId = user[0].user_id;

    // Fetch subject and content for the invitation email template
    const { subject, content } = emailTemplates?.invitation;

    const senderName = await userModels.fetchUserInfoById(createdBy);

    // Function to replace placeholders in the email content with actual values
    const dynamicContent = replacePlaceholders(req.body, temporaryPassword, content, dashboardLink, senderName[0].username, domain);

    // Send invitation email to the newly created user with dynamic subject and content
    // await sendInvitationEmail(req.body, subject, dynamicContent);

    console.log('User created successfully with unique username and temporary password');
    res.status(statusCode['OK']).json({ success: true, message: statusMessage["USER_CREATION"], temporaryPassword });
  } catch (error) {
    console.error('Error creating user with unique username and temporary password: ', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['USER_CREATION_ERROR'] });
  }
}

const getRoles = async (req, res) => {
  try {
    const { roleId } = req.query;
    const roles = await userModels.fetchRoles(roleId);
    res.status(statusCode['OK']).json({ success: true, message: statusMessage['ROLES_INFO'], data: roles });
  } catch (error) {
    util.log('Error from getRoles API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const editUserInfo = async (req, res) => {
  try {
    const { userId, username, status, roleId } = req.body

    // Fetch the existing user information
    const userInfo = await userModels.fetchUserInfoById(userId);
    const currentRoleId = userInfo[0].role_id;

    // Update user details
    const advertisers = await userModels.editUserDetails(userId, username, status, roleId)

    // Check if the role is being updated
    if (roleId !== currentRoleId) {
      // Fetch subject and content for the Access Update email template
      const { subject, content } = emailTemplates?.accessUpdate;

      // Function to replace placeholders in the email content with actual values
      const dynamicContent = replacePlaceholdersForAccessUpdate(req.body, content, dashboardLink, domain);

      // Send invitation email to the newly created user with dynamic subject and content
      await sendInvitationEmail(req.body, subject, dynamicContent);

      console.log('Email has been sent successfully for role update email template');
    }

    res.status(statusCode['OK']).json({ success: true, message: statusMessage['USERS_DETAILS_UPDATION'] });
  } catch (error) {
    util.log('Error from editUserInfo API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is exist 
    const isUser = await userModels.isUserExistQuery(email);

    if (!isUser || isUser.length === 0) {
      return res.status(statusCode['BAD_REQUEST']).json({ success: false, message: statusMessage["WRONG_CREDENTIAL"] });
    }

    // Check if the user is active 
    const user = await userModels.userLoginQuery(email);

    if (!user || user.length === 0) {
      return res.status(statusCode['BAD_REQUEST']).json({ success: false, message: statusMessage["DEACTIVATED_USER"] });
    }

    // Verify the password
    const match = await bcrypt.compare(password, user[0].password);

    if (!match) {
      return res.status(statusCode['FOUR_ZERO_ONE']).json({ success: false, message: statusMessage["WRONG_CREDENTIAL"] });
    }

    // Generate JWT token
    const payload = {
      uid: user[0].user_id,
      un: user[0].username,
      em: user[0].email,
      rid: user[0].role_id
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    // Merge payload and advDetails into a single object
    const responseData = {
      ...payload,
    };

    // Send the token in the response
    res.status(statusCode['OK']).json({ success: true, message: statusMessage["LOGIN_SUCCESSFUL"], data: responseData, accessToken: 'Bearer ' + token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: true, message: statusMessage["INTERNAL_SERVER_ERROR"] });
  }
}

// Function to replace placeholders in the email content with actual values
const replacePlaceholders = (users, password, content, dashboardLink, senderName, domain) => {
  let dynamicContent = content;
  const values = {
    username: users.username,
    roleName: util.getRoleName(users.role),
    senderName: senderName,
    email: users.email,
    temporaryPassword: password,
    dashboardLink: dashboardLink,
    domain: domain
  };

  for (const [placeholder, value] of Object.entries(values)) {
    dynamicContent = dynamicContent.replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
  }
  return dynamicContent;
};

// Function to replace placeholders in the email content with actual values
const replacePlaceholdersForAccessUpdate = (users, content, dashboardLink, domain) => {
  let dynamicContent = content;
  const values = {
    username: users.username,
    roleName: util.getRoleName(users.roleId),
    email: users.email,
    dashboardLink: dashboardLink,
    domain: domain
  };

  for (const [placeholder, value] of Object.entries(values)) {
    dynamicContent = dynamicContent.replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
  }
  return dynamicContent;
};



module.exports = {
  getRoles,
  createUser,
  editUserInfo,
  login,
}
