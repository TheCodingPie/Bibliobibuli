
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

const getPublisher=async(username)=>{
  let dataToSend={username};
  let res = await axios.post(url+'GetPublisher/', dataToSend);
  return res.data;
}

const searchPublishers=async (part)=>{
  let dataToSend={part};
  let res = await axios.post(url+'SearchPublishers/', dataToSend);
  return res.data;
}


const addOrder=async (idUser,userUsername,userAddress
  ,publisherUsername,price, countBook,idBook, nameBook ,userEmail)=>{
    let total=countBook*price;
  let dataToSend={idUser,userUsername,userAddress
    ,publisherUsername,price, countBook,idBook, nameBook,sendBook:false, totalPrice:total, userEmail, seeUser:false};
  let res = await axios.post(url+'AddOrder/', dataToSend);
  return res.data;
}
const seeOrders= async(username)=>{
  let dataToSend = {
    username
  };
  let res = await axios.post(url+'SeeOrders/', dataToSend);
  let data = await res.data;
  return data;
}

const viewOrder= async(orderId)=>{
  let dataToSend = {
    orderId
  };
  let res = await axios.post(url+'ViewOrder/', dataToSend);
  let data = await res.data;
  return data;
}


export{
  createUser,
  login,
  returnImageNumber,
  changeAdress,
  returnUser,
  ratePublisher,
  canRatePublisher,
  getPublisher,
  searchPublishers,
  addOrder,
  seeOrders,
  viewOrder

}


