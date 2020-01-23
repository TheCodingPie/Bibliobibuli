
import axios from 'axios';
import Fetchurl from './FetchUrl';

let url=Fetchurl.url + 'User/'


  const createUser = async (username, name, lastname, address, email , password, grade, numOfBorrowedBooks, incomingRequests,
     madeRequests,booksForSale, booksToRent) => {

    let dataToSend = {
      username, name, lastname, address, email , password, grade, numOfBorrowedBooks, incomingRequests,
        madeRequests,booksForSale, booksToRent
    };

    let res = await axios.post(url+'createUser/', dataToSend);
    let data = await res.data;
    return data;

  }



  

export{
  createUser
}


