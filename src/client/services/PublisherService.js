import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Publisher/';

const createPublisher = async (username, email , password, booksForSale) => 
{
let dataToSend = {
    username,  email , password, booksForSale
  };

  let res = await axios.post(url+'createPublisher/', dataToSend);
  let data = await res.data;
  return data;

}

const loginPublisher = async (username,  password) => 
{
let dataToSend = {
    username,  
    password
  };

  let res = await axios.post(url+'loginPublisher/', dataToSend);
  let data = await res.data;
  return data;

}



export{
    createPublisher,
    loginPublisher
}

