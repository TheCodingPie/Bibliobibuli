let mongoose = require('mongoose')


let bookSchema = new mongoose.Schema({
  name: String,
  nameAuthor:String,
  lastnameAuthor:String,
  comments:[{comment:String,usernameCommentAuthor:String}],
  numOfReviews:Number,
  totalOfReviews:Number,
  averageReview:Number,
  usernameOwner:String,
  bookType:String,
  imageNumber:Number,
  borrowedTo:[{username:String,returnDate:Date}],
  description:String,
  yearPublishing:Number,
  publishing:String,
  urlImage:String,
  ratings:[{rating:Number,userid:mongoose.Schema.Types.ObjectId}],  

  
})

module.exports = mongoose.model('BookExchange', bookSchema)/*User je ime kolekcije ali to mongo prebaci u mnozinu pa ga pamti u bazi kao Users, kolekcija=tabela */