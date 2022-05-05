const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const YoutubeImage = new Schema({
  img: String,
  name: { type: String, unique: true },
  desc: String,
  video_id: String,
});

YoutubeImage.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('YoutubeImage', YoutubeImage, 'YoutubeImage');
