const express = require('express');
const router = express.Router();
const check_token = require('../../middlewares/tokenVerifierMiddleware');

const gameController = require('../../controllers/gameController');

router.get('/', check_token, gameController.game_list);

router.post('/new', check_token, gameController.game_create);

router.put('/edit', check_token, gameController.game_edit);

//router.post('/search', check_token, gameController.game_search);

module.exports = router;
