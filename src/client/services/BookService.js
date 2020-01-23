import axios from 'axios';
import Fetchurl from './FetchUrl';


class BookService {
  constructor(url) {
    this.url =url;

  }
  

}

export default (new BookService(Fetchurl.url));

