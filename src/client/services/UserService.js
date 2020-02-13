
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

  const login = async (username,  password) => 
  {
 let dataToSend = {
      username,  
      password
    };

    let res = await axios.post(url+'login/', dataToSend);
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

 const ratePublisher=async(userId,publisherId, rating)=>{

  let dataToSend={
    userId,publisherId, rating
  }
  let res = await axios.post(url+'RatePublisher/', dataToSend);
  let data = await res.data;
  return data;

 }

 const canRatePublisher=async (publisherId,userId)=>{
  let dataToSend={publisherId,userId};
  let res = await axios.post(url+'CanRatePublisher/', dataToSend);
  return res.data;
}

const grantRequest =async(data)=>
{
  let dataToSend={userId:data.userId,requestId:data.requestId}
  let res=await axios.post(url+'grantRequest/', dataToSend);
  let resData = await res.data;
  return resData;
}

const notifyUser =async(request)=>
{
  
  let res=await axios.post(url+'notifyUser/', request);
  let resData = await res.data;
  return resData;
}

export{
  createUser,
  login,
  returnImageNumber,
  changeAdress,
  returnUser,
  grantRequest,
  notifyUser,
}


