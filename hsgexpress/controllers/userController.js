// const User = require('../models/userModel');
// const Token = require('../models/tokenModel');
// const bcrypt = require('bcrypt-nodejs');
// const secret = require('../config/secret');
// const jwt = require('jsonwebtoken');
// const constants = require('../constants/constants');
// const SALT_FACTOR = constants.SALT_FACTOR;
// const EXPIRE_TIME = constants.EXPIRE_TIME;

// TODO: Update later
// exports.user_list = function(req, res) {
// 	console.log(req.decoded);
// 	User.find({ _id: { $ne: req.decoded._id }}, function(err, users) {
// 		if (err) {
// 			return res.send({
// 				status: 500, err: err });
// 		} else {
// 			return res.send({ status: 200, users: users });
// 		}
// 	});
// };

// exports.user_list = function(req, res) {
// 	User.find({ _id: { $ne: req.decoded._id }}, function(err, users) {
// 		if (err) {
// 			return res.send({ status: 500, err: err });
// 		} else {
// 			return res.send({ status: 200, users: users });
// 		}
// 	});
// };
