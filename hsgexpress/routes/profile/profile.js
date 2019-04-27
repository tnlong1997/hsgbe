var express = require('express');
var router = express.Router();

const profileController = require('../../controllers/profileController');

router.post('/password', profileController.change_password);

router.post('/userid', profileController.change_profile);

router.get('/', function(req, res) {
	return res.send({ status: 200, index: "profile"});
});

module.exports = router;
