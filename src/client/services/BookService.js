import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Book/';






const addBookExchange = async (name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description,yearPublishing,publishing) => 
{
let dataToSend = {
    name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description, yearPublishing,publishing
  };

  let res = await axios.post(url+'addBook/', dataToSend);
  console.log(res)
  return res;

}
export  {addBookExchange}