const express = require('express');
const router = express.Router();
const tokenVerifierMiddlewares = require('../middlewares/tokenVerifierMiddlewares');

const userController = require('../controllers/userController');

// router.get('/', check_token, userController.user_list);
router.get(
	'/:userId/profile',
	tokenVerifierMiddlewares.verify_access_token,
	userController.user_get_info
);

router.put(
	'/',
	tokenVerifierMiddlewares.verify_access_token,
	userController.user_update_info
);
module.exports = router;
