const express = require("express");
var router = express.Router();

var  userModel = require("../models/user");
var  bookModel = require("../models/books");
var publisherModel = require("../models/publisher");
var ObjectID = require('mongodb').ObjectID;
router.post('/createUser', async(req, res) => {
       console.log(req.body)
        let user=new userModel(req.body);
       
    user.save((err, result)=>{
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

          router.post('/grantRequest',async(req,res)=>{
              
            userModel.updateOne({_id:req.body.userId},
              { $pull: { incomingRequests:  {_id: req.body.requestId } } } 
            ,(err,result)=>{
              (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) ;
            } );



          });

          router.post('/notifyUser', async(req, res) => {
            
             
            
           userModel.updateOne(
              { username:req.body.username }, 
              { $push: { 
                grantedRequests:{username:req.body.username,userId:req.body.userId,bookName:req.body.bookName,ownerUsername:req.body.ownerUsername} 
                      } 
              },(err,result)=>
                (err)? res.json(false): (result.ok===1)? res.json(true) : res.json(false) 
               
          )});

          router.post('/gradeUser', async(req, res) => {
            
             console.log(req.body);
            
            userModel.updateOne(
               { username:req.body.username }, 
               { $set: { 
                 grade:req.body.grade ,sumOfGrades:req.body.sumOfGrades
                       } ,$inc:{numOfGrades:1},$push:{usersWhoGradedMe:req.body.userGrading}
               },(err,result)=>
                 (err)? console.log(err): (result.ok===1)? res.json(true) : res.json(false) 
                
           )});
        

        
          

module.exports = router;
