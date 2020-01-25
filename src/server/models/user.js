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
   incomingRequests:[{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
   madeRequests:[{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
   booksForSale:[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
   booksToRent:[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],

  
})

module.exports = mongoose.model('User', userSchema)/*User je ime kolekcije ali to mongo prebaci u mnozinu pa ga pamti u bazi kao Users, kolekcija=tabela */