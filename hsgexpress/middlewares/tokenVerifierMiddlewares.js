let jwt = require('jsonwebtoken');
const secret = require('../config/secret');

exports.verify_access_token = (req, res, next) => {

	let token = req.headers['x-access-token'] || req.headers['authorization'];

	if (token) {
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		} else {
			return res.send({
				code: 401,
				message: "Unauthorized. The client passed in the invalid token or didn't pass any token"
			});
		}

		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.send({
					code: 401,
					message: "Unauthorized. The client passed in the invalid token or didn't pass any token"
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.send({
			code: 401,
			message: "Unauthorized. The client passed in the invalid token or didn't pass any token"
		});
	}
};
