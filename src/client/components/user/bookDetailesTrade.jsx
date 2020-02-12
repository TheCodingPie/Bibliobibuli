import React from 'react';
import firebase from '../../config/firebaseConfig'
import { FormControl, Button, Col, Image, Container, Row, Media, Modal } from 'react-bootstrap';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import * as boo from '../../services/UserService'
var storageRef = firebase.storage().ref();

class BookDetailTrade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
   
      user: this.props.location.state.user,
      idPhoto:this.props.location.state.book_id,
      item:this.props.location.state.item,
      image:{  name:"",
        nameAuthor:"",
        lastnameAuthor:"",
        comments:[{comment:"",usernameCommentAuthor:""}],
        numOfReviews:0.0,
        averageReview:0.0,
        usernameOwner:"",
        bookType:"",
        imageNumber:0,
        borrowedTo:[{username:""}],
        description:"",
        yearPublishing:2020,
        publishing:"",
        urlImage:""},
      imgUrl:""
      
    }
    
  }
  

  componentDidMount = async () => {
    let image=await bookService.returnBookTrade(this.state.idPhoto)
    console.log(image)
    await this.setState({image:image.data,imgUrl:image.data.urlImage});
    
  }






 render() {
    return (
        <div>
        <div
        className="d-flex  align-self-start flex-column mr-2 ml-2 mb-2 "
      >
        <Image
          width={300}
          height={300}
          className="align-self-start ml-2 "
          src={this.state.image.urlImage}
          alt="radi"
          class="img-thumbnail"
        />
       
      </div>
    <label>{this.state.image.name}</label>
      </div>
    )
  }
}

export default  BookDetailTrade