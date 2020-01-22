let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/imeBaze')//ako je nema baza sam ce da je kreira

let userModel = require('./models/user')

let paki = new userModel({
  name: 'Paki',
  lastname:'Stojanovic'
})

saveUser= async (user)=>{
 let savedDocument= await user.save()//UPIS U BAZU NA KOJU SMO SE NAKACILI PREKO MONGOSE.CONNECT
 console.log(savedDocument)
   
  
}
//saveUser(paki);

