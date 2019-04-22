var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	host: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	participants: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
