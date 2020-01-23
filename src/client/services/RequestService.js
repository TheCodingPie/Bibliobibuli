import axios from 'axios';
import Fetchurl from './FetchUrl';


class RequestService {
  constructor(url) {
    this.url =url+'Request';

  }
  
}

export default (new RequestService(Fetchurl.url));

