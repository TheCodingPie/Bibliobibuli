import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Topic/';

const addTopic = async (topic, description , user,dateStarted) => 
{
    let userWhoStarted={username:user.username, id:user._id }

    let dataToSend = {
    topic,  description , userWhoStarted,dateStarted ,comments:[],seenBy:0
  
};

  let res = await axios.post(url+'addTopic/', dataToSend);
  let data = await res.data;
  return data;

}

const getTopics = async () => 
{
    

  let res = await axios.get(url+'getTopics/');
  let data = await res.data;
  return data;

}

const getTrendingTopics = async () => 
{
    

  let res = await axios.get(url+'getTrendingTopics/');
  let data = await res.data;
  return data;

}

const addComment = async (comment,topicId,username,userId) => 
{
    

  

  let dataToSend = {
  comment,  topicId , username,userId

};

let res = await axios.post(url+'addComment/', dataToSend);
let data = await res.data;
return data;
}

const incSeenBy = async (_id) => 
{
    

  

  let dataToSend = {
  _id

};

let res = await axios.post(url+'incSeenBy/', dataToSend);
let data = await res.data;
return data;
}





export{
    addTopic,
    getTopics,
    addComment,
    incSeenBy,
    getTrendingTopics,
   
}

