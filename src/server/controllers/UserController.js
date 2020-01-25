const express = require("express");
var router = express.Router();

var  userModel = require("../models/user");

router.post('/createUser', async(req, res) => {
       
        let user=new userModel(req.body);
        let savedDocument= await user.save((err, result)=>{
    if(err && err.code==11000)
       res.json("false");
    else
     res.json("Uspesno");
    
    
});
    });

module.exports = router;
