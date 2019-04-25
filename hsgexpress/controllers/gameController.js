const Game = require('../models/Game');
const Team = require('../models/Team');
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
  if(!req.body.participants || !req.body.team){
    return res.send({status: 400, err: "Missing request requirements"});
  }

	let newGame = new Game({
    host: req.decoded._id,
    participants: req.body.participants.map(_p => mongoose.Types.ObjectId(_p)),
    team: req.body.team.map(_t => mongoose.Types.ObjectId(_t)),
    address: req.body.address
  });
  let idStr = req.body.participants;

  Team.find({ '_id' : { $in : newGame.team }}, function(err, teams){
    if(err) return res.send({ status: 500, err: err});

    teams.map(_team => {
      _team.participants.map(_p => {
        if(!idStr.includes(_p.toString())){
          newGame.participants.push(_p);
          idStr.push(_p.toString());
        }
      });
    });

    newGame.save(function(err) {
      if(err) return res.send({status: 500, err: err});

      res.send({status: 200, newGame: newGame});
    });
  });
  
};

exports.game_edit = function(req, res) {
	let currentGame = req.params.id;

	//issue: validate req body
	Game.findOneAndUpdate({'_id': currentGame._id}, req.body, function(err, game) {
		if (err) {
			return res.send({ status: 400, err: err });
		} 

		return res.send({ status: 200, game: game });
	});
};


