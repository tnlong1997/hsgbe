const Game = require('../models/Game');

exports.game_list = function(req, res) {
	Game.find({}, function(err, users) {
		if (err) {
			return res.send({ status: 500, err: err });
		} else {
			return res.send({ status: 200, users: users });
		}
	});
};

exports.game_create = function(req, res) {
	let newGame = new Game(req.body);
	let decoded = req.decoded;

	newGame.host = decoded._id;

	newGame.validate(function(err) {
		if (err) {
			return res.send({ status: 400, err: err });
		}
		newGame.save(function(err) {
			if (err) {
				return res.send({ status: 500, err: err });
			}

			return res.send({
				status: 200,
				gameId: newGame._id,
				host: newGame.host
			});
		});
	});
};
