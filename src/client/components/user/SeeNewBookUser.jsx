import React from 'react';
import * as bookService from '../../services/BookService'
import "../publisher/publishercss/seeBook.css"
import { FormControl, Button, ListGroup,ListGroupItem } from 'react-bootstrap';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import MyVerticallyCenteredModal from '../publisher/CustomModal';
import "../publisher/publishercss/addBook.css"

export default class SeeNewBookUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           bookid:this.props.location.state.bookid,
           user:this.props.location.state.user,
           book:{usernamePublisher:"",name:"",nameAuthor:"",lastnameAuthor:"",bookType:"",description:""
           ,price:0,countOfBooks:0,yearPublishing:0, comments:[], averageReview:0},
           labela:"",
           comment:"",
           value:1,
           canRate:false,
           labelCanRate:"",
           modalShow:false,
           successAdd:"",
           title:""
        }
    }
    componentDidMount=async()=>{
        var result= await bookService.seeBook(this.state.bookid);
       (result) ? this.setState({book:result}):this.setState({labela:"Doslo je do greske"});
        var canRate= await bookService.canRateNewBook(this.state.bookid, this.state.user._id);
        (canRate)? this.setState({canRate:false, labelCanRate:"Mozete oceniti knjigu"}): this.setState({canRate:true, labelCanRate:"Vec ste ocenili knjigu."})

    }
    addComment=async()=>{
        var result= await bookService.addCommentNewBook(this.state.bookid,this.state.comment,this.state.user.username);
        (result)? 
         this.setState({modalShow:true, successAdd:"Uspesno ste dodali komentar.",title:"Komentarisanje knjige"}) 
         : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Komentarisanje knjige"}) ;
    }
    onChangeComment=(e)=>{
        this.setState({comment:e.target.value});
    }

    printComments=()=>{
        let comments= this.state.book.comments.map((comment, index)=>{
         return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" > <div className="col"> 
          <div><text>Autor komentara: {comment.usernameCommentAuthor}</text> </div> 
           <div>Komentar:<br/> {comment.comment}</div>
          </div>  </ListGroup.Item>);  
         });
         return comments;
     }
     rateBook=async()=>{
         let result=await bookService.rateNewBook(this.state.bookid, this.state.value, this.state.user._id);
         (result)? 
         this.setState({modalShow:true, successAdd:"Uspesno ste ocenili knjigu.",
         title:"Ocenjivanje knjige"}) 
         : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Ocenjivanje knjige"}) ;

     }

     buyBook=()=>{
        this.props.history.push({
            pathname: `/BuyNewBook`,
              state: { book: this.state.book, user:this.state.user }});
     }

     goToPublisher=()=>{
        this.props.history.push({
            pathname: `/PublisherProfile`,
              state: { username: this.state.book.usernamePublisher, user:this.state.user }});

     }
    render()
    {
       
        return(
            <div class="seeBook">
                <div class="bookAddCom"> 
              <div class="aboutBook">
                  
               <h4>O knjizi</h4>
               <br/>
               Naslov knjige:{this.state.book.name}
               <br/>
               Autor :{this.state.book.nameAuthor} {this.state.book.lastnameAuthor}
               <br/>
               Izdavac:<Button onClick={()=>this.goToPublisher()}>{this.state.book.usernamePublisher}</Button>
               <br/>
               Zanr:{this.state.book.bookType}
               <br/>
               Cena:{this.state.book.price}
               <br/>
               Godina izdavanja:{this.state.book.yearPublishing}
               <br/>
               Broj knjiga na prodaji: {this.state.book.countOfBooks}
               <br/>
               Prosecna ocena:{this.state.book.averageReview}
               <br/>
               Opis:
               <br/>
               {this.state.book.description}
                <Button onClick={()=>this.buyBook()}>Kupi</Button>              
              </div>
              <div className="contentCom">
              <div className="leftRight1"></div>
              <div class="addCommentAndRate">

             <div className="addComment">
             <FormControl as="textarea" aria-label="With textarea" placeholder="Unesite komentar" onChange={this.onChangeComment} />
            <Button onClick={()=>this.addComment()} > Dodaj komentar</Button>
             </div>
             <div className="rate">
                 <div className="rateBook">
                 <div className="leftRight"> Oceni knjigu:</div>
                 <div className="roller">
             <InputRange
              maxValue={5}
              minValue={1}
              disabled={this.state.canRate}
                value={this.state.value}
              onChange={value => this.setState({ value })} />
              </div>
               <div className="leftRight"></div>
               </div>
               <div className="rateDown">
                   {this.state.labelCanRate}
                 <Button  disabled={this.state.canRate} onClick={()=>this.rateBook()}>Oceni</Button>  
               </div>

             </div>


              </div>
              <div className="leftRight1"></div>
              </div>

              </div>
              <br/>
              <div class="comments">
                  <div className="leftRight"></div>
                  <div className="content2">
                      <h4>Komentari:</h4>
                <ListGroup>
                    {this.printComments()}
                </ListGroup>
                </div>
                <div className="leftRight"></div>
              </div>

              <MyVerticallyCenteredModal
          show={this.state.modalShow}
          data={this.state.successAdd}
          title={this.state.title}
          onHide={() => {this.setState({ modalShow: false }); window.location.reload(true) ;}}
        />
            
            </div>
        )
    }

}


