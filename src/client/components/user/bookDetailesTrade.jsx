import React from 'react';
import firebase from '../../config/firebaseConfig'
import { FormControl, Button, Col, Image, Container, Row, Media, Modal,ListGroup,ListGroupItem } from 'react-bootstrap';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import * as boo from '../../services/UserService'
import MyVerticallyCenteredModal from '../publisher/CustomModal';

import InputRange from 'react-input-range';
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
      imgUrl:"",
      comment:"",
      modalShow:false,
      canRate:false,
      value:1,
      labelCanRate:"",
      
    }
    
  }
  

  componentDidMount = async () => {
    let image=await bookService.returnBookTrade(this.state.idPhoto)
    console.log(image)
    await this.setState({image:image.data,imgUrl:image.data.urlImage});
    var canRate= await bookService.canRateBook(this.state.idPhoto, this.state.user._id);
    (canRate)? this.setState({canRate:false, labelCanRate:"Mozete oceniti knjigu"}): this.setState({canRate:true, labelCanRate:"Vec ste ocenili knjigu."})
   
  }

  printComments=()=>{
    let comments= this.state.image.comments.map((comment, index)=>{
        console.log(comment)
     return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" > <div className="col"> 
      <div><text>Autor komentara: {comment.usernameCommentAuthor}</text> </div> 
       <div>Komentar:<br/> {comment.comment}</div>
      </div>  </ListGroup.Item>);  
     });
     return comments;
 }

 addComment=async()=>{
  var result= await bookService.addCommentBook(this.state.idPhoto,this.state.comment,this.state.user.username);
  (result)? 
   this.setState({modalShow:true, successAdd:"Uspesno ste dodali komentar.",title:"Komentarisanje knjige"}) 
   : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Komentarisanje knjige"}) ;
}

onChangeComment=(e)=>{
  this.setState({comment:e.target.value});
}

rateBook=async()=>{
  let result=await bookService.rateBook(this.state.idPhoto, this.state.value, this.state.user._id);
  (result)? 
  this.setState({modalShow:true, successAdd:"Uspesno ste ocenili knjigu.",
  title:"Ocenjivanje knjige"}) 
  : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Ocenjivanje knjige"}) ;

}


 render() {
    return (
        <div style={{alignItems:'center',display:'flex',flexDirection:'column'}}>
        <div
        className=" mr-2 ml-2 mb-2 " 
        style={{display:'flex',alignItems:'center',flex:5}}
      >
        <Image
          width={300}
          height={300}
          className="ml-2 "
          src={this.state.image.urlImage}
          alt="radi"
          class="img-thumbnail"
        />
        <span></span>
        <span></span>
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <div style={{flex:2}}></div>
    <div style={{flex:2,display:'flex',flexDirection:'column',width:'100%'}}>
    <label style={{alignSelf:'center',color:'blue'}}>Broj ocena: {this.state.image.numOfReviews}</label>
    <label style={{alignSelf:'center',color:'blue'}}>Prosecna ocena: {this.state.image.averageReview}</label>
    <InputRange
              maxValue={5}
              minValue={1}
              disabled={this.state.canRate}
                value={this.state.value}
              onChange={value => this.setState({ value })} />
               {this.state.labelCanRate}
               <Button  disabled={this.state.canRate} onClick={()=>this.rateBook()}>Oceni</Button>  

    </div>
    <div style={{flex:2}}></div>
        </div>
       
      </div>
      <div style={{flex:5,display:'flex',flexDirection:'column'}}>
    <label>{this.state.image.name}</label>
    <label>Autor : {this.state.image.nameAuthor +"  "+this.state.image.lastnameAuthor}</label>
    <label>Tip knjige : {this.state.image.bookType}</label>
    <label>Godina izdavanja : {this.state.image.yearPublishing}</label>
    <label>Izdavacka kuca : {this.state.image.publishing}</label>
    <label>Opis knjige : {this.state.image.description}</label>
    </div>
    <div style={{flex:2}}>
   
   


    </div>
    <div style={{flex:5}}>
    <div className="addComment">
             <FormControl as="textarea" aria-label="With textarea" placeholder="Unesite komentar" onChange={this.onChangeComment} />
            <Button onClick={()=>this.addComment()} > Dodaj komentar</Button>
             </div>
      <h3>Komentari</h3>
      <ListGroup>
                    {this.printComments()}
                </ListGroup>

                <MyVerticallyCenteredModal
          show={this.state.modalShow}
          data={this.state.successAdd}
          title={this.state.title}
          onHide={() => {this.setState({ modalShow: false }); window.location.reload(true) ;}}
        />
</div>

      </div>
    )
  }
}

export default  BookDetailTrade