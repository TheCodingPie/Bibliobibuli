
import axios from 'axios';
import Fetchurl from './FetchUrl';

let url=Fetchurl.url + 'User/'


  const createUser = async (username, name, lastname, address, email , password, grade, numOfBorrowedBooks, numOfImages,incomingRequests, madeRequests,booksForSale, booksToRent,comments,booksSold) => 
  {
 let dataToSend = {
      username, name, lastname, address, email , password, grade, numOfBorrowedBooks,numOfImages, incomingRequests, madeRequests,booksForSale, booksToRent,comments,booksSold
    };

    let res = await axios.post(url+'createUser/', dataToSend);
    let data = await res.data;
    return data;

  }
 
  const changeAdress =async(username,address)=>
  {
    let dataToSend={username,address}
    let res=await axios.post(url+'changeAdress/', dataToSend);
    let data = await res.data;
    return data;
  }

  const loginUser = async (username,  password) => 
  {
 let dataToSend = {
      username,  
      password
    };

    let res = await axios.post(url+'loginUser/', dataToSend);
    let data = await res.data;
    return data;

  }
 const returnImageNumber =async(username)=>{
   let dataToSend={
     username
   }
   let res = await axios.post(url+'returnImageNumber/', dataToSend);
   let data = await res.data;
   return data.numOfImages;
 }
 const returnUser=async(username)=>{
   let dataToSend={username};
   let res = await axios.post(url+'returnUser/', dataToSend);
   let data = await res.data;
   return data;
 }

export{
  createUser,
  loginUser,
  returnImageNumber,
  changeAdress,
  returnUser
}


