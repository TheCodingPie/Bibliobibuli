import React from 'react';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import InputRange from 'react-input-range';
import MyVerticallyCenteredModal from '../publisher/CustomModal';
import { FormControl, Button, ListGroup,ListGroupItem } from 'react-bootstrap';
import { BrowserRouter as  Router,Link} from "react-router-dom";

export default class PublisherProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
           publisherUsername:this.props.location.state.username,
           user:this.props.location.state.user,
           publisher:{username:"",email:"", booksForSale:[], averageReview:0, totalOfReview:0, numOfReviews:0},
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
        (canRate)? this.setState({canRate:false, labelCanRate:"Mozete oceniti izdavaca"}): this.setState({canRate:true, labelCanRate:"Vec ste ocenili izdavaca."})
    }

    ratePublisher=async()=>{
        let result=await userService.ratePublisher(this.state.user._id,this.state.publisher._id, this.state.value);
        (result)? 
        this.setState({modalShow:true, successAdd:"Uspesno ste ocenili izdavaca.",
        title:"Ocenjivanje korisnika"}) 
        : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Ocenjivanje izdavaca"}) ;

    }
    //<Button className="ml-3 mr-2 mb-3" onClick={()=>this.goToBook(item.id)} >Vidi objavu</Button>
    printBooks = () => {
        let findImages = this.state.publisher.booksForSale.map((item, index) => {
          return (
            <div class="card" style={{width:"18rem"}}>
            <div class="card-body">
          <h5 class="card-title">{item.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Zanr knjige:{item.bookType}</h6>
              <p class="card-text">Kratak opis:{item.description}</p>
              
              <Link to={{
                 pathname: `/SeeNewBookUser`,
                 state: { bookid: item.id , user:this.state.user }

              }} className="card-link">Vidi detaljnije</Link>
            
              
            </div>
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

            <div style={{display:"flex", flexDirection:"column", flexGrow:1, height:"100%",backgroundColor:'lightgrey'}} >
              
                <div style={{display:"flex", flexDirection:"row", flexGrow:1}}>
                  <div style={{display:"flex", flexDirection:"column", flexGrow:1,height:'100%',alignItems:'center',justifyContent:'center'}} >
                    <h1 class="text-info">O izdavacu</h1>
                    <div>
                      <h3>
                      Naziv izdavaca:{this.state.publisher.username}
                      </h3>
                    </div>
                    <div>
                    <h3>
                      Email izdavaca:{this.state.publisher.email}
                      </h3></div>
                    <div>
                    <h3>
                      Broj ocena:{this.state.publisher.numOfReviews}
                      </h3></div>
                    <div>
                    <h3>
                      Prosecna ocena:{this.state.publisher.averageReview}
                      </h3></div>
                  </div>

                  <div style={{display:"flex", flexDirection:"column", flexGrow:1}}>
                  <div style={{display:"flex", flexDirection:"column", flexGrow:1}} >
                   
                  </div>
                  <div style={{display:"flex", flexDirection:"row", flexGrow:1}}>
                  <div style={{display:"flex", flexDirection:"column", flexGrow:1,justifyContent:'center'}}>
                 <InputRange
                 maxValue={5}
                minValue={1}
                disabled={this.state.canRate}
                value={this.state.value}
              onChange={value => this.setState({ value })} />
              {this.state.labelCanRate}
              <br/>
              <br/>

           <Button style={{backgroundColor:"#ff0178"}} disabled={this.state.canRate} onClick={()=>this.ratePublisher()}><h2>Oceni</h2></Button> 
           </div>
           <div style={{display:"flex", flexDirection:"column", flexGrow:1}} ></div>

           </div>
           <div style={{display:"flex", flexDirection:"column", flexGrow:1}} ></div>
           </div>
          </div>

          <div className="justify-content-center row" style={{flexGrow:1}}>
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

