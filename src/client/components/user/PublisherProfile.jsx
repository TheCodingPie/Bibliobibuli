import React from 'react';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import InputRange from 'react-input-range';
import MyVerticallyCenteredModal from '../publisher/CustomModal';
import { FormControl, Button, ListGroup,ListGroupItem } from 'react-bootstrap';

export default class PublisherProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
           publisherUsername:this.props.location.state.username,
           user:this.props.location.state.user,
           publisher:{username:"",email:"", booksForSale:[], averageReview:0, totalOfReview:0},
           canRate:false,
           labelCanRate:"",
           value:1,
           modalShow:false,
           successAdd:"",
           title:""
        }
    }
    componentDidMount=async()=>{
        let res = await userService.getPublisher(this.state.publisherUsername);
        (res)? this.setState({publisher:res}) : console.log(res);
        let canRate= await userService.canRatePublisher(this.state.publisher._id, this.state.user._id);
        (canRate)? this.setState({canRate:false, labelCanRate:"Mozete oceniti korisnika"}): this.setState({canRate:true, labelCanRate:"Vec ste ocenili korisnika."})
    }

    ratePublisher=async()=>{
        let result=await userService.ratePublisher(this.state.user._id,this.state.publisher._id, this.state.value);
        (result)? 
        this.setState({modalShow:true, successAdd:"Uspesno ste ocenili korisnika.",
        title:"Ocenjivanje korisnika"}) 
        : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Ocenjivanje korisnika"}) ;

    }

    printBooks = () => {
        let findImages = this.state.publisher.booksForSale.map((item, index) => {
          return (
            <div key={index} className="d-flex  align-self-start flex-column mr-2 ml-2 " >
              {item.name}
              {item.bookType}
              {item.bookNumber}
              <Button className="ml-3 mr-2 mb-3" onClick={()=>this.goToBook(item.id)} >Vidi objavu</Button>
            </div>
          )
        });
        return findImages;
      }
      goToBook=(id)=>{

        this.props.history.push({
            pathname: `/SeeNewBookUser`,
              state: { bookid: id , user:this.state.user }});
        
      }

    
    render(){
      
        return(

            <div>
                 <InputRange
              maxValue={5}
              minValue={1}
              disabled={this.state.canRate}
                value={this.state.value}
              onChange={value => this.setState({ value })} />
              {this.state.labelCanRate}

<Button  disabled={this.state.canRate} onClick={()=>this.ratePublisher()}>Oceni</Button>  

<div className="justify-content-center row">
                {this.printBooks()}
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

