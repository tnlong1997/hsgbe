var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/secret');
var jwt = require('jsonwebtoken');
const SALT_FACTOR = require('../constants/constants');

//POST signup
exports.user_sign_up = function(req, res) {
	let newUser = new User(req.body);
	newUser.validate(function(err) {
		if (err) {
			return res.send({ status: 400, err: err });
		}
		bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
			if (err) {
				return res.send({ status: 500, err: err });
			}
			bcrypt.hash(newUser.password, salt, noop, function(err, hashedPassword) {
				if (err) {
					return res.send({ status: 500, err: err });
				}
				newUser.password = hashedPassword;
				newUser.save(function(err) {
					if (err) {
						return res.send({ status: 500, err: err });
					}
					return res.send({
						status: 200,
						userId: newUser._id,
						email: newUser.email,
						password: newUser.password 
					});
				});
			});
		});
	});
};

//POST login
exports.user_log_in = function(req, res) {
	
	if (!req.body.email) {
		return res.send({ status: 400, err: "No email in input"});
	}
	if (!req.body.password) {
		return res.send({ status: 400, err: "No password in input"});
	}

	User.findOne({email: req.body.email}).exec(function(err, user) {
		if (err) {
			return res.send({ status: 500, err: err});
		}
		if (!user) {
			return res.send({ status: 400, err: "Authenticate failed. User not found"});
		}

		user.comparePassword(req.body.password, function(err, isMatch) {
			if (isMatch && !err) {
				var token = jwt.sign({email: user.email, _id: user._id}, secret, {
					expiresIn: 1000000000000000 // in seconds
				});

				return res.send({ status: 200,  token: token});
				
			} else if (!isMatch) {
				return res.send({ status: 400, err: 'Authentication failed. Passwords did not match.'});
				
			} else {
				return res.send({ status: 500, err: 'Database Error'});
			}
		});
	});
};

let noop = function() {}; // A do-nothing function for use with bcrypt module
