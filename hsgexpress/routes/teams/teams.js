var express = require('express');
var router = express.Router();
let check_token = require('../../middlewares/tokenVerifierMiddleware');

const teamController = require('../../controllers/teamController');

router.get('/', check_token, teamController.team_list);

router.post('/new', check_token, teamController.team_create);

router.put('/edit/:id', check_token, teamController.team_edit);

//router.post('/search', check_token, gameController.game_search);

module.exports = router;
