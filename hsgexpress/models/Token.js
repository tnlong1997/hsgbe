var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var Token = new Schema({
	_userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	token: {
		type: String,
		required: true,
		unique: true
	},
}, { timestamps: true }
);

Token.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('Token', Token);
