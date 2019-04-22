var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	host: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	participants: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	sport: {
		type: Schema.Types.ObjectId,
		ref: 'Sport'
	},
	team: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Team'
		}
	],
	address: {
		type: String,
		require: [true, 'Location is required']
	},
	start_at: {
		type: Date
	},
	end_at: {
		type: Date
	}
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
