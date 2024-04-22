const jwt = require('jsonwebtoken');
const constants = require("../../utils/constants");
const statusMessage = constants.statusMessage();
const statusCode = constants.statusCode();

const { httpLogger } = require('../logger/logger')


function verifyToken(req, res, next) {
  let token;
  
  const authHeader = req.header('authorization'); 
  if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
      httpLogger.info(`authHeader`, token);
  } else {
    console.log("Missing Token From Frontend------>>>>>")
    return res.status(statusCode['FOUR_ZERO_ONE']).json({ success: false, message: statusMessage["UNAUTHORIZED"] });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.data) {
      if (Array.isArray(decoded.data)) {
        if (decoded.data.length > 0) {
          req.userId = decoded.data[0].userId;
        } else {
          req.userId = null;
        }
      } else if (typeof decoded.data === 'object' && decoded.data !== null) {
        req.userId = decoded.data.hasOwnProperty('user_id') ? decoded.data.user_id : null;
      } else {
        req.userId = null;
      }
    } else {
      req.userId = decoded.hasOwnProperty('user_id') ? decoded.userId : null;
    }
    let paramUserId = req.params.userId || req.query.userId;
    
    if (paramUserId !== undefined && paramUserId !== null) {
      if (typeof paramUserId === 'string') {
        paramUserId = parseInt(paramUserId, 10);
      }  
      if (paramUserId !== req.userId) {
        return res.status(statusCode['FOUR_ZERO_THREE']).json({ success: false, message: statusMessage["INVALID_TOKEN"] });
      }
    }    
    next();
  } catch (error) {
    console.log("Exception in verifyToken----->>>>>", error)
    return res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: true, message: statusMessage["INTERNAL_SERVER_ERROR"] });
  }
}

module.exports = verifyToken;
