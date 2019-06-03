const express = require('express');
const router = express.Router();

const tokenVerifierMiddlewares = require('../middlewares/tokenVerifierMiddlewares');

const authController = require('../controllers/authController');

router.post("/signup", authController.auth_sign_up);

router.post("/signin", authController.auth_sign_in);

router.post(
	"/verify/signedin",
	tokenVerifierMiddlewares.verify_access_token,
	authController.auth_verify_signed_in
);

router.put("/password/change", authController.auth_change_password);

router.put("/password/reset", authController.auth_reset_password);

router.post("/signout", authController.auth_sign_out);

module.exports = router;
