let mongoose = require('mongoose')


let publisherSchema = new mongoose.Schema({
  username: {type:String,unique:true},
   email: String,
    password:String,
    booksForSale:[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
   

  })

module.exports = mongoose.model('Publisher', publisherSchema)