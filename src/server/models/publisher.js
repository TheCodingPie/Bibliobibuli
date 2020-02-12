let mongoose = require('mongoose')


let publisherSchema = new mongoose.Schema({
  username: {type:String,unique:true},
   email: String,
    password:String,
    booksForSale:[{name:String,bookType:String,bookNumber:Number,id:mongoose.Schema.Types.ObjectId}],
    numOfReviews:Number,
    averageReview:Number,
    totalOfReviews:Number,
    ratings:[{rating:Number,userid:mongoose.Schema.Types.ObjectId}],
  })

module.exports = mongoose.model('Publisher', publisherSchema)