
import axios from 'axios';
import Fetchurl from './FetchUrl';


class UserService {
  constructor(url) {
    this.baseUrl =url;

  }
  

}

export default (new UserService(Fetchurl.url));

