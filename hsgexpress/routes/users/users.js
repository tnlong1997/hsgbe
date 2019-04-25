const express = require('express');
const router = express.Router();
const check_token = require('../../middlewares/tokenVerifierMiddleware');

const userController = require('../../controllers/userController');

router.post('/login', userController.user_log_in);

router.post('/signup', userController.user_sign_up);

router.get('/', check_token, userController.user_list);

module.exports = router;
