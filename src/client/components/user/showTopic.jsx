import React, { Component } from "react";
import * as userService from '../../services/UserService'
import {Jumbotron,Container,ListGroup,Button, Badge} from 'react-bootstrap'
import * as topicService from '../../services/TopicService'

//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class ShowTopic extends Component {
  constructor(props) {
    super(props);

    (this.props.location.state!=undefined&&this.props.location.state.topic!=undefined && this.props.location.state.user!=undefined)?
    this.state = {
    topic:this.props.location.state.topic,
    user:this.props.location.state.user,
    addComment:false,
    commentToAdd:"",
    addCommentButton:true,
    goBack:false
    }
    :
    this.state = {
      topic:undefined,
      user:undefined,
      addComment:false,
      commentToAdd:"",
      addCommentButton:true,
      goBack:true
      }
      console.log(this.state.topic)
      console.log(this.state.user)
  }
  printComments = () => {
    if(this.state.topic.comments.length==0)return [];
  let elements =[];
     
   this.state.topic.comments.map((item, index) => {
      let date= new Date(item.date)
   elements.push (<ListGroup.Item  style={{marginBottom:20}} action  variant="info"> <div className="col">  <h3> {item.comment}  </h3> <h5>{item.userWhoCommented.username}</h5>  <h6> {date.toLocaleDateString("de")}</h6>  </div>  </ListGroup.Item>)
   }
           );
        return elements;
}
updateComments=()=>{
  let comment={ comment:this.state.commentToAdd, date: Date.now(), userWhoCommented:{username:this.state.user.username, id: this.state.user._id} }

  this.setState(prevState => ({
    topic: {                  
        ...prevState.topic,    
        comments: [...prevState.topic.comments, comment]       
    },
    addComment:false,
    commentToAdd:"",
    addCommentButton:true
}))
 
}

addComment=async()=>{
  if(this.state.commentToAdd=="")
      return;
     let res= await topicService.addComment(this.state.commentToAdd,this.state.topic._id,this.state.user.username,this.state.user._id);
    (res!==500)? this.updateComments() : console.log('greska na serveru')
    
}
handleChangeComment=(event)=> this.setState({ commentToAdd:event.target.value});
goToUserProfile=()=>this.props.history.push({
  pathname: `/UserProfile`,
state: { user: this.state.topic.userWhoStarted,userViewing:this.state.user}
});
  render() {
    if(this.state.goBack)
        return(<label>Vratite se nazad</label>)
    
    let date=new Date(this.state.topic.dateStarted);
    return (
      <div style={{display:'flex',flexDirection:'row',height:'100%',width:'100%'}}>
    {(this.state.topic==undefined || this.state.user==undefined) ? (
      <label>vrati se nazad</label>
    ) : (
      <div style={{display:'flex',flexDirection:'row',height:'100%',width:'100%'}}>
      <Jumbotron style={{display:'flex',flexDirection:'column',flex:33}}>
      <Container>
        <div style={{display:'flex',flexDirection:'column',flex:1}}>
        <h4><Badge >Pokrenuo temu:  </Badge><div></div>
        <Button variant="info" onClick={this.goToUserProfile}> <h3>{this.state.topic.userWhoStarted.username}</h3></Button>
        </h4>
        <h5>Broj pregleda: <div></div>
        { this.state.topic.seenBy}
        </h5>
        <h5>
         {date.toLocaleDateString("de")}
        </h5>
          <div style={{flex:1}}>
        <h1 style={{color:"#ff0178"}}>{this.state.topic.topic}</h1></div>
        <div style={{flex:1}} class="text-secondary"><h3>
         {this.state.topic.description}
        </h3></div>
        
        </div>
        
      </Container>
    </Jumbotron>
    <div style={{display:'flex',flexDirection:'column',flex:66}}>
    <h1 class="text-secondary">Komentari </h1>
    <span></span>
    <ListGroup style={{display:'flex',flexDirection:'column'}}>
          {this.printComments()}
  </ListGroup>

  {(this.state.addCommentButton)?(<Button variant="warning" style={{color:'white'}} onClick={()=>this.setState({addComment:true,addCommentButton:false})}><h3>Dodaj komentar</h3></Button>):([])}
  {(this.state.addComment)?   (<div className="form-group">
            <label>Vas komentar</label>
            <input
              type="text"
              className="form-control"
              placeholder="Unesite komentar"
              value={this.state.commentToAdd}
              onChange={this.handleChangeComment}
              style={{
                borderBottomColor: this.state.color
              }}
            /> <Button variant="primary" onClick={this.addComment}>Sacuvaj</Button>
          </div>):[]}
          </div>
          </div>
    )}
    </div>
    )
 



  
      
    
  
  }
}
