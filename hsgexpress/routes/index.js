var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	return res.send({ status: 200, index: "index file"});
});

module.exports = router;
