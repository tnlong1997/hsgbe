const Game = require('../models/gameModel');
const Team = require('../models/teamModel');
const mongoose = require('mongoose');

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
	if (!req.body.participants || !req.body.teams) {
		return res.send({status: 400, err: "Missing request requirements"});
	}

	let newGame = new Game({
		host: req.decoded._id,
		participants: req.body.participants.map(_p => mongoose.Types.ObjectId(_p)),
		teams: req.body.teams.map(_t => mongoose.Types.ObjectId(_t)),
		location: req.body.location
	});
	let idStr = req.body.participants;

	Team.find({ '_id': { $in: newGame.teams }}, function(err, teams) {
		if (err) return res.send({ status: 500, err: err});

		teams.map(_team => {
			_team.members.map(_p => {
				if (!idStr.includes(_p.toString())) {
					newGame.participants.push(_p);
					idStr.push(_p.toString());
				}
			});
		});

		newGame.save(function(err) {
			if (err) return res.send({status: 500, err: err});

			res.send({status: 200, newGame: newGame});
		});
	});

};

exports.game_edit = function(req, res) {
	let currentGame = mongoose.Types.ObjectId(req.params.id);

	Game.updateOne({'_id': currentGame}, req.body, function(err) {
		if (err) {
			return res.send({ status: 400, err: err });
		}

		return res.send({ status: 200 });
	});
};
