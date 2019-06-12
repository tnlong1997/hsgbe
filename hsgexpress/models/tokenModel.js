var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var Token = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	token: {
		type: String,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true
	}
}, { timestamps: true });

Token.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('Token', Token);
