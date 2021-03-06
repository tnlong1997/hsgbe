const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');

let Schema = mongoose.Schema;

let userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		maxlength: 100,
		minlength: [8, 'Email should be longer than 8 characters'],
		unique: [true, 'This email has been used'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [8, 'Password should be longer than 8 characters'],
	},
	profileId: {
		type: Schema.Types.ObjectId,
		ref: 'UserProfile',
		required: [true, "UserProfile is required"],
	}
}, { timestamps: true });

userSchema.methods.comparePassword = function(inputPassword, callback) {
	bcrypt.compare(inputPassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

userSchema.virtual('createdAtTimestamp').get(function() {
	return this.createdAt.getTime();
});

userSchema.virtual('updatedAtTimestamp').get(function() {
	return this.updatedAt.getTime();
});

userSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.password;
	return obj;
};

userSchema.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('User', userSchema);
