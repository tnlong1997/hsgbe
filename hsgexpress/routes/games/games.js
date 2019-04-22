var express = require('express');
var router = express.Router();

const gameController = require('../../controllers/gameController');

router.get('/', gameController.game_list);

router.post('/new', gameController.game_create);

router.put('/edit', gameController.game_edit);

router.post('/search', gameController.game_search);

module.exports = router;
