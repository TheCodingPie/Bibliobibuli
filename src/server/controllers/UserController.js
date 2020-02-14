const express = require("express");
var router = express.Router();

var  userModel = require("../models/user");
var  bookModel = require("../models/books");
var publisherModel = require("../models/publisher");
var ObjectID = require('mongodb').ObjectID;
var orderModel= require('../models/order');
router.post('/createUser', async(req, res) => {
       
        let user=new userModel(req.body);
        console.log(user);
     await user.save((err, result)=>{
         console.log(err);
        (err)? 
            (err.code==11000) ?  res.json("Korisnicko ime je zauzeto") :  res.json("greska na serveru") 
        : res.json("Uspesno ste kreirali profil");
    
    
        });
    });

    router.post('/login', async(req, res) => {
         userModel.find(req.body, (err, docs)=> {
           
            if(err || docs.length==0 ) 
            {
                publisherModel.find(req.body,{booksForSale:0}, (err, docs)=> 
                 {
                   if (err || docs.length==0 )
                         res.json("false") 
                   else 
                   {
                        let toSend=docs[0].toObject();
                         toSend.type='publisher';
                         res.send(toSend);
                   }
                })
               }
            else
                {  
                    let toSend=docs[0].toObject();
                    toSend.type='user'
                    res.send(toSend)
                }
            
            }
        )
    });
    router.post('/returnUser', async(req, res) => {
       
        console.log(req.body);

        userModel.find(req.body, (err, docs)=> 
           
                (err || docs.length==0 )? res.json("false") : res.send(docs[0])
        
        )
    });
    router.post('/returnImageNumber', async(req, res) => {
       

        userModel.find(req.body, (err, docs)=> 
                (err || docs.length==0 )? res.json("false") : res.send(docs[0])
        
        )
    });
   /* router.post('/addBook', async(req, res) => {
      
          let book=new bookModel(req.body);
        await user.findOneAndUpdate(
            { username:req.body.usernameOwner }, 
            { $push: { 
                      booksForSale:book 
                    } 
            })
        });*/
        router.post('/changeAdress', async(req, res) => {
      
            
         let rez= await userModel.findOneAndUpdate(
              { username:req.body.username }, 
              {
                        address:req.body.address
              });
             if(rez==null)
             res.json('false');
             else
             res.json('true');
          });


          router.post('/RatePublisher',async(req,res)=>{
            let publisherId=new ObjectID(req.body.publisherId);
            let userId=new ObjectID(req.body.userId);
            let numOfReviews=0;
             let averageReview=0;
             let total=0;
           await publisherModel.findOne({_id:publisherId},{numOfReviews:1, averageReview:1,totalOfReviews:1, _id:0}
          ,(err, result)=>{(err)? res.json(false):(!result)? res.json(false): numOfReviews=result.numOfReviews+1, averageReview=result.averageReview, total=result.totalOfReviews});
          total+=req.body.rating;
          averageReview=total/numOfReviews;

            publisherModel.updateOne({_id:publisherId},{
              $set:{numOfReviews:numOfReviews, averageReview:averageReview, totalOfReviews:total},
              $push:{
                ratings: {rating:req.body.rating, userid:userId}
              }
            },(err,result)=>{
              (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) ;
            } );
          });

          router.post('/CanRatePublisher',async(req,res)=>{
            let publisherId=new ObjectID(req.body.publisherId);
            let userId=new ObjectID(req.body.userId);
            publisherModel.findOne({_id:publisherId,ratings:{$elemMatch:{userid:userId}}},function(err, rate) {
              (err)? res.json(null): (rate)? res.json(false) : res.json(true) ;
            });
          });
        
          router.post('/GetPublisher', async(req,res)=>{
            publisherModel.findOne({username:req.body.username},{password:0,ratings:0}, function(err, user) {
                (err)? res.json(false): (!user)? res.json(false) : res.json(user) ;
            });
    
        });


        router.post('/SearchPublishers',async(req,res)=>{

          publisherModel.find({username:{$regex:req.body.part}},{_id:1,username:1},
          
            function(err, publishers) {
              (err)? res.json([]): (publishers)? res.json(publishers) : res.json([]) ;
            } );
        
          });

          router.post('/AddOrder', async(req, res) => {
            let order=new orderModel(req.body);
           let rez=  await order.save();
           if(rez==null)
           res.json('false');
           else
           res.json('true');
         
          });

          router.post('/SeeOrders',async(req,res)=>{
            
            orderModel.find({userUsername:req.body.username,seeUser:false}, function(err, orders) {
                (err)? res.json([]): (!orders)? res.json([]) : res.json(orders) ;
            });
        });
          

        router.post('/ViewOrder',async(req,res)=>{
          let idOrder=new ObjectID(req.body.orderId);

          await orderModel.updateOne({_id:idOrder},{
            $set:{seeUser:true}
          },(err, result)=>{(err)? res.json(false):(!result)? res.json(false): res.json(true)} );
      });
        
          

        
          

module.exports = router;
