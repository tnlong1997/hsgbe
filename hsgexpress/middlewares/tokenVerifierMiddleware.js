let jwt = require('jsonwebtoken');
const secret = require('../config/secret');

let check_token = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization']; 
  
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.send({
					status: 400,
					err: err,
					message: 'Invalid token'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.send({
			status: 400,
			message: 'No token'
		});
	}
};

module.exports = check_token;

