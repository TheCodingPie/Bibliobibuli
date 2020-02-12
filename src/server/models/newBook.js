let mongoose = require('mongoose')


let bookSchema = new mongoose.Schema({
  name:{type: String, index:true},
  nameAuthor:String,
  lastnameAuthor:String,
  comments:[{comment:String,usernameCommentAuthor:String}],
  numOfReviews:Number,
  averageReview:Number,
  totalOfReviews:Number,
  ratings:[{rating:Number,userid:mongoose.Schema.Types.ObjectId}],
  usernamePublisher:String,
  bookType:String,
  description:String,
  yearPublishing:Number,
  publishing:String,
  price:Number,
  countOfBooks:Number
   
})
bookSchema.index({name:'text'});
module.exports = mongoose.model('NewBook', bookSchema)