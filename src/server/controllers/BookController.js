const express = require("express");
var router = express.Router();

var  bookModel = require("../models/books");
var  userModel = require("../models/user");
var  bookforAuction = require("../models/booksForAuction");
var newBookModel= require('../models/newBook');
var publisherModel=require('../models/publisher');
var ObjectID = require('mongodb').ObjectID;
var orderModel=require("../models/order");


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
    
     bookModel.find({name: {'$regex':b}},{name:1,_id:1},function (err,books){
       (err)? res.json([]):(books)? res.json(books) :res.json([])  ;
     })
 
    });
    router.post('/searchBarAuction', async(req, res) => {
      let b=req.body.name;
     
     bookforAuction.find({name: {'$regex':b}},{name:1,_id:1},function (err,books){
       (err)? res.json([]):(books)? res.json(books) :res.json([])  ;
     })
 
    });
    router.post('/returnBookAuction', async(req, res) => {
     bookforAuction.find(req.body, (err, docs)=> 
           
     (err || docs.length==0 )? res.json("false") : res.send(docs[0])

)
 
    });
    router.post('/returnBookTrade', async(req, res) => {
     bookModel.find(req.body, (err, docs)=> {
     (err || docs.length==0 )? res.json("false") : res.send(docs[0])}

)   });

    router.post('/AddNewBook',async(req,res)=>{
      let newBook= new newBookModel(req.body);
      await newBook.save();
      let result= await publisherModel.updateOne(
        {username:newBook.usernamePublisher},
         { $push:{
             booksForSale:{name:newBook.name, bookType:newBook.bookType,description:newBook.description,bookNumber:newBook.countOfBooks,id:newBook._id}
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

  router.post('/BorrowBookTradeConfirmed',async(req,res)=>{
    let returnDate=new Date();
     returnDate.setDate(returnDate.getDate() + 10);
      
      
    bookModel.updateOne({_id:req.body._id},{$push:{borrowedTo:{username:req.body.username,returnDate}}},
    
     (err) =>
        (err)? res.json(false): res.json(true)
       );
  
    });

    router.post('/BorrowBookTrade',async(req,res)=>{//da pita da li moze da pozajmi
    
     
      userModel.updateOne({username:req.body.ownerUsername},{$push:{incomingRequests:{username:req.body.username,userId:req.body.userId,bookId:req.body.bookId,bookName:req.body.bookName,ownerUsername:req.body.ownerUsername}}},
      
       (err) =>
          (err)? res.json(false): res.json(true)
         );
    
      });

    
  router.post('/FreeBook',async(req,res)=>{
    
      
      
    bookModel.updateOne({_id:req.body._id},{$push:{borrowedTo:{username:req.body.username,returnDate:Date.now()}}},
    
     (err) =>
        (err)? res.json(false): res.json(true)
       );
  
    });
    router.post('/addBidAuction', async(req, res) => {
      let bid=req.body;
    let rez=await bookforAuction.updateOne(
     { _id:bid._id}, 
     { $push: {
       bids:{price:parseInt(bid.price),usernameBidder:bid.usernameBidder,seen:false}
     },$set:{highestBid:{price:parseInt(bid.price),usernameBidder:bid.usernameBidder,seen:false}}
     ,
    
     })
      res.json('true')
   });
   router.post('/findBookBought', async(req, res) => {
    let bid=req.body;
    console.log(bid)
 let rezult= await bookforAuction.find( 
   { 
     highestBid:{usernameBidder:bid.usernameBidder,seen:false},
     auctionEndDate:{$lt: bid.date}
   }
    
   

   )
   res.json(rezult);
  
 });


  router.post('/AddCommentBook',async(req,res)=>{
    let id=new ObjectID(req.body.id);
    bookModel.updateOne({_id:id},{
      $push:{
        comments: {comment:req.body.comment,usernameCommentAuthor:req.body.username}
      }
    },(err,result)=>{
      (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) ;
    } );
});

router.post('/CanRateBook',async(req,res)=>{
  let id=new ObjectID(req.body.id);
  let userid=new ObjectID(req.body.userid);
  bookModel.findOne({_id:id,ratings:{$elemMatch:{userid:userid}}},function(err, rate) {
    (err)? res.json(null): (rate)? res.json(false) : res.json(true) ;
  });
});

router.post('/RateBook',async(req,res)=>{
  let id=new ObjectID(req.body.id);
  let userid=new ObjectID(req.body.userid);
  let numOfReviews=10;
   let averageReview=10;
   let total=0;
 await bookModel.findOne({_id:id},{numOfReviews:1, averageReview:1,totalOfReviews:1, _id:0}
,(err, result)=>{(err)? res.json(false):(!result)? res.json(false): numOfReviews=result.numOfReviews+1, averageReview=result.averageReview, total=result.totalOfReviews});
total+=req.body.rating;
averageReview=total/numOfReviews;

  bookModel.updateOne({_id:id},{
    $set:{numOfReviews:numOfReviews, averageReview:averageReview, totalOfReviews:total},
    $push:{
      ratings: {rating:req.body.rating, userid:userid}
    }
  },(err,result)=>{
    (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) ;
  } );
});


router.post('/SellNewBook',async(req,res)=>{

  let id=new ObjectID(req.body.id);
  let idOrder=new ObjectID(req.body.orderId);
  let count=0;
  await newBookModel.findOne({_id:id},{countOfBooks:1, _id:0}
    ,(err, result)=>{(err)? res.json(false):(!result)? res.json(false): count=result.countOfBooks});
  
    count-=req.body.count;
    let success=false;
   await newBookModel.updateOne({_id:id},{
      $set:{countOfBooks:count}
    },(err, result)=>{(err)? res.json(false):(!result)? res.json(false): success=true} );

   if(success){
    await orderModel.updateOne({_id:idOrder},{
      $set:{sendBook:true}
    },(err, result)=>{(err)? res.json(false):(!result)? res.json(false): res.json(true)} );
  }
  else{
    res.json(false);
  }

});










 
 


    

module.exports = router;
