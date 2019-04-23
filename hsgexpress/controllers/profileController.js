var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var constants = require('../constants/constants');
const SALT_FACTOR = constants.SALT_FACTOR;

// POST change profile
exports.change_profile = function(req, res) {
	if (!req.body.email) {
		return res.send({ status: 400, err: "No email to identify to user"});
	}

	User.findOneAndUpdate({email: req.body.email}, req.body, function(err, user) {
		if (err) {
			return res.send({ status: 500, err: err});
		}
        
		if (!user) {
			return res.send({ status: 400, err: "User not found for email but we are in Profile page"});
		}

		return res.send({ status: 200, msg: "User info updated"});
	});
};

// POST change password
exports.change_password = function(req, res) {
	if (!req.body.email) {
		return res.send({ status: 400, err: "No email in input"});
	}
	if (!req.body.password) {
		return res.send({ status: 400, err: "No password in input"});
	}
    
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) {
			return res.send({ status: 500, err: err });
		}
		bcrypt.hash(req.body.password, salt, noop, function(err, hashedPassword) {
			if (err) {
				return res.send({ status: 500, err: err });
			}
			User.findOneAndUpdate({email: req.body.email}, {$set: {"password": hashedPassword}}, function(err, user) {
				if (err) {
					return res.send({ status: 500, err: err});
				}
                
				if (!user) {
					return res.send({ status: 400, err: "User not found for email but we are in Profile page"});
				}
        
				return res.send({ status: 200, msg: "Password updated"});
			});
		});
	});
};

let noop = function() {}; // A do-nothing function for use with bcrypt module