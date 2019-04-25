var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
