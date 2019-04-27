let User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt-nodejs');
const secret = require('../config/secret');
const jwt = require('jsonwebtoken');
const constants = require('../constants/constants');
const SALT_FACTOR = constants.SALT_FACTOR;
const EXPIRE_TIME = constants.EXPIRE_TIME;

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
				let token = jwt.sign({email: user.email, _id: user._id}, secret, {
					expiresIn: EXPIRE_TIME
				});

				let loginToken = new Token({
					_userId: user,
					email: user.email,
					token: token
				});

				user.save(function(err) {
					if (err) {
						return res.send({ status: 500, err: err});
					}

					loginToken.save(function(err) {
						if (err) {
							return res.send({ status: 400, err: err});
						}	

						return res.send({ status: 200,  token: token});
					});
				});
			} else if (!isMatch) {
				return res.send({ status: 400, err: 'Authentication failed. Passwords did not match.'});
				
			} else {
				return res.send({ status: 500, err: 'Database Error'});
			}
		});
	});
};

exports.user_list = function(req, res) {
	console.log(req.decoded);
	User.find({ _id: { $ne: req.decoded._id }}, function(err, users) {
		if (err) {
			return res.send({ status: 500, err: err });
		} else {
			return res.send({ status: 200, users: users });
    }
  });
};

      
exports.user_verify_log_in = function(req, res) {
	if (!req.get("Token")) {
		return res.send({ status: 400, err: "No token in input"});
	}
	Token.findOne({ token: req.get("Token") }, function(err, token) {
		if (err) {
			return res.send({ status: 500, err: err});
		}

		if (!token) {
			return res.send({ status: 400, err: "Authentication failed. Token not found"});
		}

		let decodedToken = jwt.verify(token.token, secret, { expiresIn: EXPIRE_TIME });
		
		if (decodedToken._id === token._userId.toString()) {
			return res.send({ status: 200 });	
		} else {
			return res.send({ status: 500, err: 'Authentication failed. Token does not match user data' });
		}
	});
};

exports.user_list = function(req, res) {
  User.find({ _id: { $ne: req.decoded._id }}, function(err, users) {
    if(err) {
      return res.send({ status: 500, err: err });
    } else {
      return res.send({ status: 200, users: users });
    }
  });
};

let noop = function() {}; // A do-nothing function for use with bcrypt module
