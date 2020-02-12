let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
   username: {type:String,unique:true},
   name: String,
   lastname:String,
   address:String,
   email: String,
   password:String,
   comments: [{ comment: String, date: Date,userWhoCommented:{type: mongoose.Schema.Types.ObjectId, ref: 'User'} }],
   grade:Number,
   numOfBorrowedBooks: Number,
   numOfImages:Number,
   incomingRequests:[{type: mongoose.Schema.Types.Object, ref: 'Request'}],
   madeRequests:[{type: mongoose.Schema.Types.Object, ref: 'Request'}],
   booksForSale:[{name:String,lastnameAuthor:String,urlImage:String,id:mongoose.Schema.Types.ObjectId}],
   booksToRent:[{name:String,lastnameAuthor:String,urlImage:String,id:mongoose.Schema.Types.ObjectId}],
   booksSold:[{name:String}]
  
})

module.exports = mongoose.model('User', userSchema)/*User je ime kolekcije ali to mongo prebaci u mnozinu pa ga pamti u bazi kao Users, kolekcija=tabela */