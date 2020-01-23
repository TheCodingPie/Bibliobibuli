import axios from 'axios';
import Fetchurl from './FetchUrl';


class PublisherService {
  constructor(url) {
    this.url =url+'Publisher';

  }
  

}

export default (new PublisherService(Fetchurl.url));

