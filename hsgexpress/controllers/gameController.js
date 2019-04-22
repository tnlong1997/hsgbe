const Game = require('../models/Game');

exports.game_list = function(req, res) {
  Game.find({}, function(err, users) {
    if(err) {
      return res.send({ status: 500, err: err });
    } else {
      return res.send({ status: 200, users: users });
    }
  });
};

exports.game_create = function(req, res) {
  let newGame = new Game(req.body);
  newGame.host = req.decoded._id;

  console.log(req.body.team.pariticipants)

  newGame.validate(function(err) {
    if (err) {
      return res.send({ status: 400, err: err });
    }
    newGame.save(function(err) {
      if (err) {
        return res.send({ status: 500, err: err });
      }
      Game.findOneAndUpdate({ "_id" : newGame._id }, { 
        $push : { 
          "participants" : req.body.participants, 
          "team" : req.body.team
        }
      }, function(err, updatedGame) {
        if(err) {
          return res.send({ status: 500, err: err });
        }
        return res.send({
          status: 200,
          gameId: updatedGame._id,
          host: updatedGame.host,
          participants: updatedGame.participants,
          team: updatedGame.team
        });
      });  
    });
  });
};

exports.game_edit = function(req, res) {
  let currentGame = req.params.id;

  //issue: validate req body
  Game.findOneAndUpdate({'_id' : currentGame._id}, req.body, function(err, game) {
    if(err) {
      return res.send({ status: 400, err: err });
    } 

    return res.send({ status: 200, game: game });
  });
};
