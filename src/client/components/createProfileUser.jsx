import React, { Component } from "react";
import "../styles/login.css";
import {Modal,Button} from 'react-bootstrap'
import * as userService from '../services/UserService'
//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class CreateProfileUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      login: "nije",
      name: "",
      lastname: "",
      email: "",
      successful: "",
      borderColor: "lightgray",
      modalShow:false,
      address:"",
      numOfImages:0
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

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeLastname(event) {
    this.setState({ lastname: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangeAddress(event) {
    this.setState({address: event.target.value });
  }

  createUser = async () => {
    if (
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.name == "" ||
      this.state.lastname == "" ||
      this.state.address == "" ||
      this.state.email == ""
    ) {
     this.setState({modalShow:true});
      return;
    }
  
var res= await userService.createUser(this.state.username,this.state.name,this.state.lastname, this.state.address, this.state.email,this.state.password,0,0,0,[],[],[],[]);
console.log(res)  
this.setState({successful:res});  


  };

  render() {
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
              <label>Ime</label>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite vase ime"
                onChange={this.handleChangeName.bind(this)}
              />
            </div>

            <div className="form-group">
              <label>Prezime</label>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite vase prezime"
                onChange={this.handleChangeLastname.bind(this)}
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
            <div className="form-group">
              <label>Adresa</label>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite vasu adresu"
                onChange={this.handleChangeAddress.bind(this)}
              />
              </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.createUser}
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
