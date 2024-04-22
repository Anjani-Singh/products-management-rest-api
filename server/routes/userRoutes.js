const router = require("express").Router();

const { getRoles, createUser,
    editUserInfo, login } = require('../controllers/userController')

const validateUser = require('../middleware/validation/userValidation');
const validateLogin = require('../middleware/validation/loginValidation');
const verifyToken = require('../middleware/authentication/authMiddleware');


router.post('/login', validateLogin, login)
router.get('/roles', verifyToken, getRoles); 
router.post('/create', validateUser, verifyToken, createUser) 
router.patch('/editUser', verifyToken, editUserInfo)     



module.exports = router;