var express = require('express');
var router = express.Router();
let middlewares = require('../../middlewares/middlewares');

const gameController = require('../../controllers/gameController');

router.get('/', middlewares.check_token, gameController.game_list);

router.post('/new', middlewares.check_token, gameController.game_create);

//router.put('/edit', middlewares.check_token, gameController.game_edit);

//router.post('/search', middlewares.check_token, gameController.game_search);

module.exports = router;
