const express = require("express");
var router = express.Router();

var  userModel = require("../models/user");

router.post('/createUser', async(req, res) => {
        console.log(req.body);
        let paki=new userModel(req.body);
        let savedDocument= await paki.save()
         console.log(savedDocument)
        res.json("Uspesno");
    
});

module.exports = router;
