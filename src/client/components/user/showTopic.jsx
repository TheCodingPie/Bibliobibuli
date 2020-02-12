import React, { Component } from "react";
import * as userService from '../../services/UserService'
import {Jumbotron,Container,ListGroup,Button} from 'react-bootstrap'
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
   elements.push (<ListGroup.Item action  variant="info"> <div className="col">  <h3> {item.comment}  </h3> <h4>{item.userWhoCommented.username}</h4>  <h6> {date.toLocaleDateString("de")}</h6>  </div>  </ListGroup.Item>)
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

  render() {
    if(this.state.goBack)
        return(<label>Vratite se nazad</label>)
    
    let date=new Date(this.state.topic.dateStarted);
    return (
      <div>
    {(this.state.topic==undefined || this.state.user==undefined) ? (
      <label>vrati se nazad</label>
    ) : (
      <Jumbotron fluid>
      <Container>
        <h1>{this.state.topic.topic}</h1>
        <h2>
         {this.state.topic.description}
        </h2>
        <p>Pokrenuo temu - - >  
        <Button> {this.state.topic.userWhoStarted.username}</Button>
        </p>
        <p>Broj pregleda--> 
        {this.state.topic.seenBy}
        </p>
        <p>
         {date.toDateString()}
        </p>
        <h2>Komentari </h2>
        <ListGroup style={{display:'flex',flexDirection:'column'}}>
              {this.printComments()}
      </ListGroup>

      {(this.state.addCommentButton)?(<Button variant="primary" onClick={()=>this.setState({addComment:true,addCommentButton:false})}>Dodaj komentar</Button>):([])}
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
      </Container>
    </Jumbotron>
    )}
    </div>
    )
 



  
      
    
  
  }
}
