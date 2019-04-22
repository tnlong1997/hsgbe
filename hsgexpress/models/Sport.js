var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new Schema({
  sport_name: {
    type: String,
    require: [true, 'Sport Name required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Sport', sportSchema);
