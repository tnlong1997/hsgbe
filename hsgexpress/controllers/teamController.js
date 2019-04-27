const Team = require('../models/Team');
const mongoose = require('mongoose');

exports.team_list = function(req, res) {
	Team.find({ creator: req.decoded._id }, function(err, teams) {
		if (err) {
			return res.send({ status: 500, err: err });
		} else {
			return res.send({ status: 200, teams: teams });
		}
	});
};

exports.team_create = function(req, res) {
	let newTeam = new Team({
		creator: req.decoded._id,
		members: req.body.members.map(_m => mongoose.Types.ObjectId(_m))
	});
  
	newTeam.save(function(err) {
		if (err) return res.send({status: 500, err: err});
		return res.send({status: 200, newTeam: newTeam});
	});
};

exports.team_edit = function(req, res) {
	let currentTeam = mongoose.Types.ObjectId(req.params.id);
  
	Team.updateOne({'_id': currentTeam}, req.body, function(err) {
		if (err) {
			return res.send({ status: 400, err: err });
		} 

		return res.send({status: 200});
	});
};
