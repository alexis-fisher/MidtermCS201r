var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  title: String,
  session: String,
  url: String,
  speaker: String,
  upvotes: {type: Number, default: 0},
});
CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Comment', CommentSchema);
