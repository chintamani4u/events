var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Event   = new Schema({
		name : String,
		youtube_video_link : String,
		image : String,
		description : String,
		starts : String,
		ends : String,
		location : String,
		hashtag : String,
		your_name : String,
		your_telephone_number : String,
		your_email_address : String

});

module.exports = mongoose.model('Event', Event);
