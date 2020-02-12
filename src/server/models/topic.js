let mongoose = require('mongoose')


let topicSchema = new mongoose.Schema({
   topic: {type:String,unique:true},
   description:String,
   seenBy:Number,
   userWhoStarted:{username:String ,id: mongoose.Schema.Types.ObjectId},
   dateStarted:Date,
   comments: [{ comment: String, date: Date, userWhoCommented:{username:String, id: mongoose.Schema.Types.ObjectId} }],
     
})

module.exports = mongoose.model('Topic', topicSchema);