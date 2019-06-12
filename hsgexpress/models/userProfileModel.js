const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userProfileSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		unique: [true, "Duplicate profile for user"],
		required: [true, "Referrence to User is required"],
	},
	username: {
		type: String,
		required: [true, "Username is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"]
	},
	firstName: {
		type: String,
		required: [true, "First name is required"]
	},
	address: {
		type: String,
	},
	age: {
		type: Number,
		required: [true, "Age is required"]
	},
	gender: {
		type: String,
		required: [true, "Gender is required"]
	},
	country: {
		type: String,
		required: [true, "Country is required"]
	},
	phone: {
		type: String,
	}
}, {
	timestamp: true,
	// toObject: {
	// 	virtuals: true,
	// },
	// toJSON: {
	// 	virtuals: true,
	// }
});

userProfileSchema.virtual('createdAtTimestamp').get(function() {
	return this.createdAt.getTime();
});

userProfileSchema.virtual('updatedAtTimestamp').get(function() {
	return this.updatedAt.getTime();
});

userProfileSchema.virtual('fullName').get(function() {
	return this.firstName + this.lastName;
});

userProfileSchema.methods.toJSON = function() {
	var obj = this.toObject();
	obj.fullName = obj.firstName + obj.lastName;
	return obj;
};

userProfileSchema.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('UserProfile', userProfileSchema);
