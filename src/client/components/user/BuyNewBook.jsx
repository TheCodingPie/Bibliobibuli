import React from 'react';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from '../publisher/CustomModal';

export default class BuyNewBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           book:this.props.location.state.book,
           user:this.props.location.state.user,
           countToBuy:1,
           modalShow:false,
           successAdd:"",
           title:""
        }
    }

    

    confirmOrder=async()=>{
        var result= await userService.addOrder(this.state.user._id, this.state.user.username, this.state.user.address, 
            this.state.book.usernamePublisher,this.state.book.price, this.state.countToBuy,this.state.book._id,this.state.book.name, this.state.user.email);
            (result)? 
         this.setState({modalShow:true, successAdd:"Uspesno ste porucili.",
         title:"Porucivanje knjige"}) 
         : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Porucivanje knjige"}) ;
    }

    onChangeBookCount=(e)=>{
        this.setState({countToBuy:e.target.value});
        
    }


    render(){
       
        return(
            <div style={{flexGrow:1, flexDirection:"row", display:"flex"}}>
                <div style={{flexGrow:2}}></div>
                <div style={{flexGrow:3,display:"flex",flexDirection:"column"}}>

                   <div>
                       Naslov knjige:   {this.state.book.name}
                  </div> 
                  
                  <div>
                      Izdavac :{this.state.book.usernamePublisher}
                  </div>

                <div  >
                
                    Kolicina knjiga:
              
                 <input
                type="number"
                className="form-control"
                value={this.state.countToBuy}
                onChange={this.onChangeBookCount}/> 
                
                </div>
                <div>
                    Ukupna cena knjiga:
                {this.state.countToBuy * this.state.book.price}
                </div>
                <div>
                    Cena knjige po komadu:{this.state.book.price}
                </div>
                <div>
                    Adresa na koju ce biti poslata knjiga:
                    {this.state.user.address}
                </div>
                 <div style={{flexDirection:"row", display:"flex"}}>
                 <div style={{flexGrow:3}}></div>
                <Button onClick={()=>this.confirmOrder()}>Potvrdite </Button>
               
                </div>
                </div>
                <div style={{flexGrow:2}}></div>
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