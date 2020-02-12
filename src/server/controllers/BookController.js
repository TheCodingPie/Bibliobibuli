const express = require("express");
var router = express.Router();

var  bookModel = require("../models/books");
var  userModel = require("../models/user");
var  bookforAuction = require("../models/booksForAuction");


    router.post('/addBook', async(req, res) => {
       let book=new bookModel(req.body);
     await book.save();
     let rez=await userModel.updateOne(
      { username:book.usernameOwner}, 
      { $push: {
        booksToRent:{name:book.name,lastnameAuthor:book.lastnameAuthor,urlImage:book.urlImage,id:book._id}
      },
      numOfImages:parseInt(book.imageNumber)+1
      })
       res.json('true')
    });
    router.post('/addBookAuction', async(req, res) => {
       let book=new bookforAuction(req.body);
     await book.save();
     let rez=await userModel.updateOne(
      { username:book.usernameOwner}, 
      { $push: {
        booksForSale:{name:book.name,lastnameAuthor:book.lastnameAuthor,urlImage:book.urlImage,id:book._id,}
      },
      numOfImages:parseInt(book.imageNumber)+1
      })
       res.json('true')
    });
    router.post('/searchBarTrade', async(req, res) => {
      let b=req.body.name;
      console.log(b)
     bookModel.find({name: {'$regex':b}},{name:1,_id:1},function (err,books){
       (err)? res.json([]):(books)? res.json(books) :res.json([])  ;
     })
 
    });
    router.post('/searchBarAuction', async(req, res) => {
      let b=req.body.name;
      console.log(b)
     bookforAuction.find({name: {'$regex':b}},{name:1,_id:1},function (err,books){
       (err)? res.json([]):(books)? res.json(books) :res.json([])  ;
     })
 
    });
    router.post('/returnBookAuction', async(req, res) => {
      console.log(b)
     bookforAuction.find(req.body, (err, docs)=> 
           
     (err || docs.length==0 )? res.json("false") : res.send(docs[0])

)
 
    });
    router.post('/returnBookTrade', async(req, res) => {
     bookModel.find(req.body, (err, docs)=> {
     (err || docs.length==0 )? res.json("false") : res.send(docs[0])}

)
 
    });


    

module.exports = router;