import React from 'react';
import * as bookService from '../../services/BookService'
import {  Button,FormControl} from 'react-bootstrap';
import MyVerticallyCenteredModal from './CustomModal';
import "./publishercss/addBook.css"


class AddNewBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            publisher:this.props.location.state.publisher,
            nameAuthor:"",
            lastnameAuthor:"",
            bookName:"",
            bookType:"",
            aboutBook:"",
            publishing:"",
            yearPublishing:new Date().getFullYear(),
            countBook:1,
            bookPrice:10,
            modalShow:false,
            successAdd:""        


        }
    }
    onChangeAutorName=(e)=>{
        this.setState({nameAuthor: e.target.value});
    }
    onChangeAutorLastname=(e)=>{
        this.setState({lastnameAuthor:e.target.value});
    }

    onChangeBookType=(e)=>{
        this.setState({bookType:e.target.value});
    }
    onChangeBookName=(e)=>{
        this.setState({bookName:e.target.value});
    }

    onChangeBookPrice=(e)=>{
        this.setState({bookPrice:e.target.value});
    }

    onChangeBookDescription=(e)=>{
        this.setState({aboutBook:e.target.value});
    }

    onChangeBookCount=(e)=>{
        this.setState({countBook:e.target.value});
    }

    onChangeYearPublishing=(e)=>{
        this.setState({yearPublishing:e.target.value});
    }

    printYearToSelect=()=>{
      let elements=[];
       for(var i=1900; i<2100; i++)
       {
           elements.push(<option key={i} value={i}>
            {i}
          </option>)
       }
       return elements;
    }
    addBook= async()=>{
        let res= await bookService.addNewBook(this.state.publisher.username, this.state.bookName, this.state.nameAuthor
            ,this.state.lastnameAuthor,this.state.bookType,this.state.aboutBook,this.state.bookPrice,this.state.countBook,this.state.yearPublishing);
           (res)? this.setState({modalShow:true, successAdd:"Uspesno ste dodali."}) : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo."}) ;
            //window.location.reload(true);
    }

    render() {
       
        return (
            <div className="addNewBook">
                <div className="leftRight"></div>

                <div className="content">
                    <div className="contentHeader"></div>
                    <div className="content2">
                    <h6>Ime knjige:</h6>
                <input
                type="text"
                className="form-control"
                placeholder="Naslov knjige"
                value={this.state.bookName}
                onChange={this.onChangeBookName}/> 
                   
            <h6>Cena knjige:</h6>
                <input
                type="number"
                className="form-control"
                placeholder="Cena knjige"
                value={this.state.bookPrice}
                onChange={this.onChangeBookPrice}/> 

                <h6>Broj knjiga za prodaju:</h6>
                <input
                type="number"
                className="form-control"
                placeholder="Broj knjiga za prodaju"
                value={this.state.countBook}
                onChange={this.onChangeBookCount}/> 

         <h6>Godina izdavanja:</h6>
         <div style={{height:"8%"}}>
            <select
             className="optionsSelect"
              onChange={this.onChangeYearPublishing}
             value={this.state.yearPublishing}
             
            >
              {this.printYearToSelect()}
            </select>
            </div>
            <div style={{height:"10%"}}>
                <input
                type="text"
                className="form-control"
                placeholder="Ime autora"
                value={this.state.nameAuthor}
                onChange={this.onChangeAutorName}/> 
                </div>
                <div style={{height:"10%"}}>
                <input
                type="text"
                className="form-control"
                placeholder="Prezime autora"
                value={this.state.lastnameAuthor}
                onChange={this.onChangeAutorLastname}/> 
                </div>
             
            <div style={{height:"10%"}}>
                <input
                type="text"
                className="form-control"
                placeholder="Zanr knjige"
                value={this.state.bookType}
                onChange={this.onChangeBookType}/> 
                </div>
          
                <FormControl as="textarea" aria-label="With textarea" placeholder="Opis knjige"
               
                onChange={this.onChangeBookDescription}/> 
             
            
              <div style={{height:"10%"}}>
                <Button onClick={()=>this.addBook()}>Dodaj knjigu</Button>
           </div>

            <MyVerticallyCenteredModal
          show={this.state.modalShow}
          data={this.state.successAdd}
          title="Dodavanje knjige"
          onHide={() => {this.setState({ modalShow: false }); window.location.reload(true) ;}}
        />
            </div>
          
            </div>

            <div className="leftRight"></div>
            
            </div>
            
        )
    }

}


export default AddNewBook


