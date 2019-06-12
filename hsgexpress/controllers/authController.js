const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const UserProfile = require('../models/userProfileModel');

const bcrypt = require('bcrypt-nodejs');
const secret = require('../config/secret');
const jwt = require('jsonwebtoken');

const constants = require('../constants/constants');
const SALT_FACTOR = constants.SALT_FACTOR;
const EXPIRE_TIME = constants.EXPIRE_TIME;

//POST - Signout
exports.auth_sign_up = function(req, res) {
	if (!req.body) {
		return res.send({
			code: 400,
			message: "No body in the request",
		});
	}

	if (!req.body.email) {
		return res.send({
			code: 400,
			message: "No email in the request",
		});
	}

	if (!req.body.password) {
		return res.send({
			code: 400,
			message: "No password in the request",
		});
	}

	let newProfile = new UserProfile(req.body);
	let newUser = new User({
		email: req.body.email,
		password: req.body.password,
	});

	newProfile.userId = newUser._id;
	newUser.profileId = newProfile._id;

	new Promise(function(resolve, reject) {
		newProfile.save((err) => {
			if (err) {
				reject({
					code: 600,
					message: err.message
				});
			} else {
				// console.log(newProfile);
				resolve();
			}
		});
	}).then(() => {
		return new Promise(function(resolve, reject) {
			bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
				if (err) {
					reject({
						code: 600,
						message: err.message,
					});
				} else {
					resolve(salt);
				}
			});
		});
	}).then((salt) => {
		return new Promise(function(resolve, reject) {
			bcrypt.hash(req.body.password, salt, null, function(err, hashedPassword) {
				if (err) {
					reject({
						code: 600,
						message: err.message,
					});
				} else {
					resolve(hashedPassword);
				}
			});
		});
	}).then((hashedPassword) => {
		return new Promise(function(resolve, reject) {
			newUser.password = hashedPassword;
			newUser.save(function(err) {
				if (err) {
					reject({
						code: 600,
						message: err.message
					});
				}
				resolve(newUser._id);
			});
		});
	}).then((userId) => {
		// console.log(newProfile);
		res.send({
			code: 200,
			message: "Successful request",
			userId: userId,
			profile: newProfile,
		});
	}).catch((errResponse) => {
		res.send(errResponse);
	});

};

//POST - Signin
exports.auth_sign_in = function(req, res) {

	if (!req.body.email) {
		return res.send({
			code: 400,
			message: "No email in input"});
	}

	if (!req.body.password) {
		return res.send({
			code: 400,
			message: "No password in input"
		});
	}

	User.findOne({email: req.body.email}).exec(function(err, user) {
		if (err) {
			return res.send({
				code: 600,
				message: err,
			});
		}

		if (!user) {
			return res.send({
				code: 601,
				message: "Wrong email",
			});
		}

		user.comparePassword(req.body.password, function(err, isMatch) {
			if (isMatch && !err) {
				let info = {
					email: user.email,
					userId: user._id,
					type: "access",
				};
				let accessToken = jwt.sign(info, secret, {expiresIn: EXPIRE_TIME});

				let newToken = new Token({
					userId: user._id,
					type: "access",
					token: accessToken,
				});

				newToken.save(function(err) {
					if (err) {
						return res.send({
							code: 400,
							message: err.message,
						});
					}

					return res.send({
						code: 200,
						message: "Successful request",
						payload: {
							userId: user._id,
							accessToken: accessToken,
						}
					});
				});
			}
			else if (!isMatch) {
				return res.send({
					code: 602,
					message: 'Wrong password',
				});
			}
			else {
				return res.send({
					code: 600,
					message: err.message,
				});
			}
		});
	});
};

// GET - Verify signed in
exports.auth_verify_signed_in = function(req, res) {
	res.send({
		code: 200,
		message: "Successful request. User has signed in"
	});
};

//TODO: Change Password
exports.auth_change_password = function() {
	console.log("Placeholder for change password");
};

//TODO: Reset Password
exports.auth_reset_password = function() {
	console.log("Placeholder for reset password");
};

//TODO: Signout
exports.auth_sign_out = function() {
	console.log("Placeholder for signout");
};
