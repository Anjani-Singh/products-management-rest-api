const { v4: uuidv4 } = require('uuid');

const dbEngine = require("../lib/mysqlEngine");
const constants = require("../utils/constants");
const { log } = require('../utils/util');


async function fetchRoles(roleId) {
    try {
        let query;
        let values;
        
        if (!roleId || roleId === '1') {
            query = `SELECT id as rid, name as rn FROM ?? WHERE status = ?`;
            values = [constants['table']['ROLES'], 1];
        } else if (roleId === '2') {
            query = `SELECT id as rid, name as rn FROM ?? WHERE status = ? AND id IN (?, ?)`;
            values = [constants['table']['ROLES'], 1, 2, 3];
        } else if (roleId === '3') {
            query = `SELECT id as rid, name as rn FROM ?? WHERE status = ? AND id = ?`;
            values = [constants['table']['ROLES'], 1, 3];
        } else {
            throw new Error('Invalid roleId');
        }

        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (!result || result.length === 0) {
            throw new Error('No records found for the roles');
        }
        return result;
    } catch (error) {
        console.error('fetchRoles Error:', error);
        throw new Error(`Error fetching roles: ${error.message}`);
    }
}

async function userInsertQuery(username, uniqueUsername, email, password, role, createdBy) {
    try {
        // Insert user into the users table with the unique username and hashed temporary password
        let query = 'INSERT INTO ?? (user_id, username, unique_user_name, email, password, role_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)';

        let values = [constants['table']['USERS_DETAILS'], uuidv4(), username, uniqueUsername, email, password, role, createdBy];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);
        return result;
    } catch (error) {
        console.error('userInsertQuery Error:', error);
        throw new Error(`Error fetching roles: ${error.message}`);
    }
}

async function fetchUserId(uniqueUsername) {
    try {
        let query = `SELECT user_id FROM ?? WHERE unique_user_name = ?`;

        let values = [constants['table']['USERS_DETAILS'], uniqueUsername];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (!result || result.length === 0) {
            throw new Error('No records found for the Users database');
        }
        return result;
    } catch (error) {
        console.error('fetchUserId Error:', error);
        throw new Error(`Error fetching Advertisers: ${error.message}`);
    }
}

async function fetchExistingUserQuery(uniqueUsername) {
    try {
        let query = `SELECT * FROM ?? WHERE unique_user_name = ?`;
        let values = [constants['table']['USERS_DETAILS'], uniqueUsername];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result;
    } catch (error) {
        log("fetchExistingUserQuery", error)
        throw new Error(`Error fetchExistingUserQuery: ${error.message}`);
    }
}

async function editUserDetails(userId, newName, isActive, roleId) {
    try {
        // Update user's name, email, and is_active flag
        let updateUserQuery = `
            UPDATE user_details
            SET username = ?,
                status = ?,
                role_id = ?
            WHERE user_id = ?;
        `;
        let updateUserValues = [newName, isActive, roleId, userId];
        let updateUserSql = dbEngine.mysqlFormat(updateUserQuery, updateUserValues);
        await dbEngine.executeQuery(updateUserSql);
        return true
    } catch (error) {
        console.error('fetchUserInfo Error:', error);
        throw new Error(`Error editing user details: ${error.message}`);
    }
}

async function userLoginQuery(email) {
    try {
        let query = 'SELECT * FROM ?? WHERE email = ? AND status = 1';

        let values = [constants['table']['USERS_DETAILS'], email];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);
        return result;
    } catch (error) {
        console.error('userLoginQuery Error:', error);
        throw new Error(`Error getting userLoginQuery: ${error.message}`);
    }
}

async function isUserExistQuery(email) {
    try {
        let query = 'SELECT * FROM ?? WHERE email = ?';

        let values = [constants['table']['USERS_DETAILS'], email];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);
        return result;
    } catch (error) {
        console.error('userLoginQuery Error:', error);
        throw new Error(`Error getting userLoginQuery: ${error.message}`);
    }
}

async function userRoleQuery(userId) {
    try {
        let query = 'SELECT role_id FROM ?? WHERE user_id = ?';
        let values = [constants['table']['USERS_DETAILS'], userId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result;
    } catch (error) {
        throw new Error(`Error getting userLoginQuery: ${error.message}`);
    }
}

async function fetchUserInfoById(userId) {
    try {
        let query = `SELECT * FROM ?? WHERE user_id = ?`;

        let values = [constants['table']['USERS_DETAILS'], userId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (!result || result.length === 0) {
            throw new Error('No records found for the Users database');
        }
        return result;
    } catch (error) {
        console.error('fetchUserInfoById Error:', error);
        throw new Error(`Error fetching Users: ${error.message}`);
    }
}

async function isEmailExistQuery(email) {
    try {
        let query = 'SELECT * FROM ?? WHERE email = ?';

        let values = [constants['table']['USERS_DETAILS'], email];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);
        return result;
    } catch (error) {
        console.error('userLoginQuery Error:', error);
        throw new Error(`Error getting userLoginQuery: ${error.message}`);
    }
}




module.exports = {
    fetchRoles,
    userInsertQuery,
    fetchUserId,
    fetchExistingUserQuery,
    editUserDetails,
    userLoginQuery,
    userRoleQuery,
    fetchUserInfoById,
    isEmailExistQuery,
    isUserExistQuery,
};

