var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/secret');
var jwt = require('jsonwebtoken');

const SALT_FACTOR = 12;

exports.user_sign_up = function(req, res) {
	let newUser = new User(req.body);
	newUser.validate(function(err) {
		if (err) {
			return res.status(400).send({ err: err.message });
		}
		bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
			if (err) {
				return res.status(600).send({ err: err });
			}
			bcrypt.hash(newUser.password, salt, noop, function(err, hashedPassword) {
				if (err) {
					return res.status(600).send({ err: err });
				}
				newUser.password = hashedPassword;
				newUser.save(function(err) {
					if (err) {
						return res.status(600).send({ err: err });
					}
          			return res.status(200).send({ userId: newUser._id });
				});
			});
		});
	});
};

exports.user_log_in = function(req, res) {
	
	if (!req.body.email) {
		return res.status(400).send({ err: "No email in input"});
	}
	if (!req.body.password) {
		return res.status(400).send({err: "No password in input"});
	}

	User.findOne({email: req.body.email}).exec(function(err, user) {
			if (err) {
				return res.status(600).send({err: err});
			}
			if (!user) {
				return res.status(601).send({err: "Authenticate failed. User not found"});
			}

			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
					var token = jwt.sign({email: user.email, _id: user._id}, secret, {
						expiresIn: 1000000000000000 // in seconds
					});

					return res.status(200).send({token : token});
				
        } else if (!isMatch) {
					return res.status(601).send({err: 'Authentication failed. Passwords did not match.'});
				
        } else {
					return res.status(600).send({err: 'Database Error'});
				}
			});
		});
};

let noop = function() {}; // A do-nothing function for use with bcrypt module
