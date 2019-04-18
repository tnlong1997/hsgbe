var express = require('express');
var router = express.Router();

const userController = require('../../controllers/userController');

router.post('/login', userController.user_log_in);

router.post('/signup', userController.user_sign_up);

router.get('/', function(req, res) {
	return res.status(200).send({index: "users"});
});

module.exports = router;
