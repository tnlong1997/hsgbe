const express = require('express');
const router = express.Router();
const check_token = require('../../middlewares/tokenVerifierMiddleware');

const userController = require('../../controllers/userController');

router.post('/login', userController.user_log_in);

router.post('/signup', userController.user_sign_up);

router.get('/', check_token, userController.user_list);

router.get('/login', userController.user_verify_log_in);

module.exports = router;
