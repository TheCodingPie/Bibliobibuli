let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
   username: {type:String,unique:true},
   name: String,
   lastname:String,
   address:String,
   email: String,
   password:String,
   comments: [{ comment: String, date: Date,userWhoCommented:{username:String,id: mongoose.Schema.Types.ObjectId,} }],
   grade:Number,
   numOfBorrowedBooks: Number,
   numOfImages:Number,
   incomingRequests:[{username:String,userId: mongoose.Schema.Types.ObjectId,bookId:mongoose.Schema.Types.ObjectId,bookName:String,ownerUsername:String}],
   grantedRequests:[{username:String,userId: mongoose.Schema.Types.ObjectId,bookId:mongoose.Schema.Types.ObjectId,bookName:String,ownerUsername:String}],
   booksForSale:[{name:String,lastnameAuthor:String,urlImage:String,id:mongoose.Schema.Types.ObjectId}],
   booksToRent:[{name:String,lastnameAuthor:String,urlImage:String,id:mongoose.Schema.Types.ObjectId}],
   booksSold:[{name:String}]
  
})

module.exports = mongoose.model('User', userSchema)/*User je ime kolekcije ali to mongo prebaci u mnozinu pa ga pamti u bazi kao Users, kolekcija=tabela */