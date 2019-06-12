const UserProfile = require('../models/userProfileModel');

exports.user_get_info = function(req, res) {
	//TODO: Encapsulate data by comparing userId in token with userId in params

	UserProfile.findOne({userId: req.params.userId}, function(err, user) {
		if (err) {
			res.send({
				code: 600,
				message: err.message,
			});
		}
		res.send({
			code: 200,
			message: "Successful request",
			payload: user,
		});
	});
};

exports.user_update_info = function(req, res) {
	UserProfile.findOneAndUpdate({userId: req.decoded.userId}, {$set: req.body}, {new: true}, function(err, newProfile) {
		if (err) {
			return res.send({
				code: 600,
				message: err.message,
			});
		}

		if (!newProfile) {
			return res.send({
				code: 605,
				message: "Can't find user with given ID",
			});
		}

		res.send({
			code: 200,
			message: "Successful request",
			payload: newProfile,
		});
	});
};
