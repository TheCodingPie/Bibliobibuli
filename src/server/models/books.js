let mongoose = require('mongoose')


let bookSchema = new mongoose.Schema({
  name: String,
  nameAuthor:String,
  lastnameAuthor:String,
  comments:[{comment:String,usernameCommentAuthor:String}],
  numOfReviews:Number,
  averageReview:Number,
  usernameOwner:String,
  bookType:String,
  imageNumber:Number
  

  
})

module.exports = mongoose.model('Books', bookSchema)/*User je ime kolekcije ali to mongo prebaci u mnozinu pa ga pamti u bazi kao Users, kolekcija=tabela */