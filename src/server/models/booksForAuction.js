let mongoose = require('mongoose')


let bookAuctionSchema = new mongoose.Schema({
  name: String,
  nameAuthor:String,
  lastnameAuthor:String,
  usernameOwner:String,
  bookType:String,
  imageNumber:Number,
  startPrice:Number,
  bids:[{price:Number,usernameBidder:String}],
  auctionEndDate:Date,
  auctionEndTime:Date,
  highestPrice:Number,
  winner:String


  

  
})

module.exports = mongoose.model('BookAuction', bookAuctionSchema)