var express = require('express');
var router = express.Router();
let middlewares = require('../../middlewares/middlewares');

const teamController = require('../../controllers/teamController');

router.get('/', middlewares.check_token, teamController.team_list);

router.post('/new', middlewares.check_token, teamController.team_create);

router.put('/edit/:id', middlewares.check_token, teamController.team_edit);

//router.post('/search', middlewares.check_token, gameController.game_search);

module.exports = router;
