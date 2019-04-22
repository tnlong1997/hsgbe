const Team = require('../models/Team');

exports.team_list = function(req, res) {
  Team.find({ host : req.decoded._id }, function(err, teams) {
    if(err) {
      return res.send({ status: 500, err: err });
    } else {
      return res.send({ status: 200, teams: teams });
    }
  });
};

exports.team_create = function(req, res) {
  let newTeam = new Team(req.body);

  newTeam.host = req.decoded._id;

  newTeam.validate(function(err) {
    if (err) {
      return res.send({ status: 400, err: err });
    }
    newTeam.save(function(err) {
      if (err) {
        return res.send({ status: 500, err: err });
      }
      Team.findOneAndUpdate({ "_id" : newTeam._id }, { $push : { "participants" : req.body.participants }}, function(err, updatedTeam) {
        if(err) {
          return res.send({ status: 500, err: err });
        }
        return res.send({
          status: 200,
          teamId: updatedTeam._id,
          host: updatedTeam.host,
          participants: updatedTeam.participants
        });
      });    
    });
  });
};

exports.team_edit = function(req, res) {
  let currentTeam = req.params.id;
  
  //issue: validate req body
  Team.findOneAndUpdate({'_id' : currentTeam._id}, req.body, function(err, team) {
    if(err) {
      return res.send({ status: 400, err: err });
    } 

    return res.send({ status: 200, team: team });
  });
};
