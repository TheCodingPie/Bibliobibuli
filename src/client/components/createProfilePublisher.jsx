import React, { Component } from "react";
import "../styles/login.css";
import {Modal,Button} from 'react-bootstrap'
import * as publisherService from '../services/PublisherService'
let timer;
//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class CreateProfilePublisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      login: "nije",
      email: "",
      successful: "",
      borderColor: "lightgray",
      modalShow:false,
     
    };
  }
  handleChangeusername(event) {
    this.setState({
      username: event.target.value,
      borderColor: "lightgrey",
      successful: ""
    });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

    handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
createPublisher = async () => {
    if (
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.email == ""
    ) {
     this.setState({modalShow:true});
      return;
    }
  
var res= await publisherService.createPublisher(this.state.username,this.state.email,this.state.password,[]);
console.log(res)    
this.setState({successful:res});


  };
  goToLogin=()=>{
    clearInterval(timer);
    this.props.history.push({
    pathname: `/`,
    
  });}

  render() {
    if(this.state.successful=="Uspesno ste kreirali profil") 
       timer=setInterval(this.goToLogin, 1500)
    return (
      <div className="celaStrana">
        <div className="iznadIIspod"></div>
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
          <div className="login">
            <h3
              style={{
                alignSelf: "center"
              }}
            >
              Kreiranje profila
            </h3>

            <div className="form-group">
              <label>Korisnicko ime</label>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite korisnicko ime"
                onChange={this.handleChangeusername.bind(this)}
                style={{
                  borderColor: this.state.borderColor
                }}
              />
            </div>

            <div className="form-group">
              <label>Sifra</label>
              <input
                type="password"
                className="form-control"
                placeholder="Unesite sifru"
                onChange={this.handleChangePassword.bind(this)}
              />
            </div>

           
            <div className="form-group">
              <label>E mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Unesite vas email"
                onChange={this.handleChangeEmail.bind(this)}
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.createPublisher}
            >
              Kreiraj profil
            </button>
         
            <label
              style={{
                alignSelf: "center",
                color: "red"
              }}
            >
              {this.state.successful}
            </label>
          </div>
          <div className="iznadIIspod1"></div>
        </div>
        <div className="iznadIIspod"></div>

        <Modal
      show={this.state.modalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="justify-content-center row">
        <text>Unesite sve podatke</text>
      </div>
      <Modal.Body className="justify-content-center col ">
        <div className="justify-content-center row"></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>this.setState({modalShow:false})}>U redu</Button>
      </Modal.Footer>
    </Modal>

      </div>
    );
  }
}
