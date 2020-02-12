const express = require("express");
var router = express.Router();

var  bookModel = require("../models/books");
var  userModel = require("../models/user");
var newBookModel= require('../models/newBook');
var publisherModel=require('../models/publisher');
var ObjectID = require('mongodb').ObjectID;


    router.post('/addBook', async(req, res) => {
      console.log("lalala")
       let book=new bookModel(req.body);
     await book.save();
     let rez=await userModel.updateOne(
      { username:book.usernameOwner}, 
      { $push: {
        booksToRent:{name:book.name,lastnameAuthor:book.lastnameAuthor,imageNumber:book.imageNumber,id:book._id}
      }
      })
       
    });


    router.post('/AddNewBook',async(req,res)=>{
      let newBook= new newBookModel(req.body);
      await newBook.save();
      let result= await publisherModel.updateOne(
        {username:newBook.usernamePublisher},
         { $push:{
             booksForSale:{name:newBook.name, bookType:newBook.bookType,bookNumber:newBook.countOfBooks,id:newBook._id}
           }
         })
         if(result.ok===1)
         res.json(true);
         else
         res.json(false);  
    });


router.post('/SeeBook',async(req,res)=>{
        let id=new ObjectID(req.body.id);
        newBookModel.findOne({_id:id},function(err, book) {
            (err)? res.json(null): (!book)? res.json(null) : res.json(book) ;
        });
    });

    router.post('/AddCommentNewBook',async(req,res)=>{
      let id=new ObjectID(req.body.id);
      newBookModel.updateOne({_id:id},{
        $push:{
          comments: {comment:req.body.comment,usernameCommentAuthor:req.body.username}
        }
      },(err,result)=>{
        (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) ;
      } );
  });

  router.post('/RateNewBook',async(req,res)=>{
    let id=new ObjectID(req.body.id);
    let userid=new ObjectID(req.body.userid);
    let numOfReviews=10;
     let averageReview=10;
     let total=0;
   await newBookModel.findOne({_id:id},{numOfReviews:1, averageReview:1,totalOfReviews:1, _id:0}
  ,(err, result)=>{(err)? res.json(false):(!result)? res.json(false): numOfReviews=result.numOfReviews+1, averageReview=result.averageReview, total=result.totalOfReviews});
  total+=req.body.rating;
  averageReview=total/numOfReviews;

    newBookModel.updateOne({_id:id},{
      $set:{numOfReviews:numOfReviews, averageReview:averageReview, totalOfReviews:total},
      $push:{
        ratings: {rating:req.body.rating, userid:userid}
      }
    },(err,result)=>{
      (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) ;
    } );
  });

  router.post('/CanRateNewBook',async(req,res)=>{
    let id=new ObjectID(req.body.id);
    let userid=new ObjectID(req.body.userid);
    newBookModel.findOne({_id:id,ratings:{$elemMatch:{userid:userid}}},function(err, rate) {
      (err)? res.json(null): (rate)? res.json(false) : res.json(true) ;
    });
  });

  
  router.post('/SearchNewBooks',async(req,res)=>{

  newBookModel.find({name:{$regex:req.body.part}},{_id:1, name:1},
  
    function(err, books) {
      (err)? res.json([]): (books)? res.json(books) : res.json([]) ;
    } );

  });











 

module.exports = router;