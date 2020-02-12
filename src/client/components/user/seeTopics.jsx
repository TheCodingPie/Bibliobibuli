import React, { Component } from "react";
import "../../styles/login.css";
import {Modal,Button} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import * as topicService from '../../services/TopicService'
//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class SeeTopics extends Component {
  constructor(props) {
    super(props);
   if (this.props.location.state!=undefined && this.props.location.state.user!=undefined)
   {
    this.state = {
      topics: [],
     user:this.props.location.state.user,
     goBack:false
     
    }

    this.getTopics(this.props.location.state.trending);
  }
  else
  this.state = {
      goBack:true
     
    }

    
  }
  
getTopics = async (trending) => {
  let  topics;
  (trending)? topics= await topicService.getTrendingTopics() : topics= await topicService.getTopics() ;
  (topics!=500) ? this.setState({topics}) : console.log("greska na serveru")
     
};
ShowTopic=async(topic)=>{

  await topicService.incSeenBy(topic._id);
  
this.props.history.push({
  pathname: `/ShowTopic`,
state: { user: this.state.user,topic }
});
}

  printTopics = () => {
      if(this.state.topics[0]==undefined)return;
    let elements =[];
        
     this.state.topics.map((item, index) => {
        let date= new Date(item.dateStarted)
     elements.push (<ListGroup.Item action onClick={()=>this.ShowTopic(item)} variant="info"> <div className="col">  <h2> {item.topic}  </h2> <h4>Pokrenuo temu-->{item.userWhoStarted.username}</h4>  <h5> {date.toLocaleDateString("de")}</h5>  </div>  </ListGroup.Item>)
     }
             );
          return elements;
  }

  render() {
    return(
    (this.state.goBack)?(<label>Vratite se nazad</label>):
     (
      <div className="celaStrana">
       
        
        <ListGroup style={{display:'flex',flexDirection:'column'}}>
              {this.printTopics()}
      </ListGroup>
        
       

       
      </div>
    ));
  }
}
