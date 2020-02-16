import React from 'react';
import * as bookService from '../../services/BookService'
import "./publishercss/seeBook.css"
import { FormControl, Button, ListGroup,ListGroupItem } from 'react-bootstrap';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import MyVerticallyCenteredModal from './CustomModal';
import "./publishercss/addBook.css"

class SeeBook extends React.Component {
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
        //var canRate= await bookService.canRateNewBook(this.state.bookid, this.state.user._id);
        //(canRate)? this.setState({canRate:false, labelCanRate:"Mozete oceniti knjigu"}): this.setState({canRate:true, labelCanRate:"Vec ste ocenili knjigu."})

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
         return (<ListGroup.Item key={ index} variant="info" className="mb-2 mt-1" style={{marginBottom:20}} > <div className="col"> 
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


    render()
    {
       
        return(
            <div class="seeBook" style={{}}>
                <div class="bookAddCom" style={{backgroundColor:'lightgrey'}}> 
              <div class="aboutBook" style={{backgroundColor:'lightgrey'}} class="text-secondary">
                  
               <h1 style={{color:"#ff0178"}}>O knjizi</h1>
               <br/>
               <h6><b>Naslov knjige: </b>{this.state.book.name}</h6>
               <br/>
               <h6><b>Autor :</b>{this.state.book.nameAuthor} {this.state.book.lastnameAuthor}</h6>
               <br/>
               <h6><b>Izdavac:</b>{this.state.book.usernamePublisher}</h6>
               <br/>
               <h6><b>Zanr:</b>{this.state.book.bookType}</h6>
               <br/>
               <h6><b>Cena:</b>{this.state.book.price}</h6>
               <br/>
               <h6><b>Godina izdavanja:</b>{this.state.book.yearPublishing}</h6>
               <br/>
               <h6><b>Broj knjiga na prodaji: </b>{this.state.book.countOfBooks}</h6>
               <br/>
               <h6><b>Prosecna ocena:</b>{this.state.book.averageReview}</h6>
               <br/>
               <h6><b>Opis:</b>
               <br/>
               {this.state.book.description}   </h6>            
              </div>
              <div className="contentCom">
              <div className="leftRight1"></div>
              <div class="addCommentAndRate">
                  <div style={{flexGrow:0.5}}></div>

             <div className="addComment">
             <FormControl as="textarea" aria-label="With textarea" placeholder="Unesite komentar" onChange={this.onChangeComment} />
            <Button variant="info" onClick={()=>this.addComment()} ><h5>Dodaj komentar</h5> </Button>
             </div>
           


              </div>
              <div className="leftRight1"></div>
              </div>

              </div>
              <br/>
              <div class="comments">
                  <div className="leftRight"></div>
                  <div className="content2">
                      <h1 class="text-warning"><b>Komentari:</b></h1>
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

export default SeeBook
