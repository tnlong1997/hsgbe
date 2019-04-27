const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let sportSchema = new Schema({
	sport: {
		type: String,
		require: [true, 'Sport Name required']
	}
}, { timestamps: true });

module.exports = mongoose.model('Sport', sportSchema);
