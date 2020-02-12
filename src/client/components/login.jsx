import React, { Component } from "react";
import * as userService from '../services/UserService'

import im from "../../images/j.jpg";

//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
     username: "",
      password: "",
      login: "nije",
      color: "lightgrey",
      response:""
    };
  }
  handleChangeId(event) {
    this.setState({ username: event.target.value, color: "lightgrey",response:"" });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value, color: "lightgrey",response:""  });
  }
/*  createProfileArtist = () => {
    this.props.history.push({
      pathname: `/createArtist`
    });
  };
  createProfileClient = () => {
    this.props.history.push({
      pathname: `/createClient`
    });
  };
  */
  login =async () => {
    if ( this.state.username == "" || this.state.password == ""  ) 
            return;
      
    
  var response= await userService.login(this.state.username,this.state.password);
 
  
  if(response=="false")
             this.setState({response:"Proverite svoje podatke",color:'red'})   
  else
     if(response.type=="user")
        this.props.history.push({
          pathname: `/FirstPageUser`,
            state: { user: response }  });//Za JOKS->>>>.ovde je ceo objekat koji ti treba 
    else
        this.props.history.push({
          pathname: `/PublisherFirstPage`,
            state: { publisher: response }});
};

  render() {
   
    return (
      <div className="celaStrana">
        <div className="iznadIIspod">
          <div className="img-flusername">
            <img src={im} alt="tatla" />
          </div>
        </div>
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
          <div className="centar">
            <div className="login">
              <div className="iznadIIspod"></div>
              <div className="Naslov">
                <h3>Sign In</h3>
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unesite korisnicko ime"
                  value={this.state.username}
                  onChange={this.handleChangeId.bind(this)}
                  style={{
                    borderBottomColor: this.state.color
                  }}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Unesite sifru"
                  value={this.state.password}
                  onChange={this.handleChangePassword.bind(this)}
                  style={{
                    borderBottomColor: this.state.color
                  }}
                />
              </div>
              <div className="butto">
                <div className="left"></div>
                <button
                  className="btn  btn-block"
                  style={{
                    backgroundColor: "#ff0178",
                    color: "blue",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flex: 2
                  }}
                  onClick={() => this.login()}
                >
                  <h5>Prijavite se</h5>
               
                </button>
                <label>{this.state.response}</label>

                <div className="left"></div>
              </div>
              <div className="iznadIIspod"></div>
             
              <div className="iznadIIspod"></div>
            </div>
          </div>
          <div className="iznadIIspod1"></div>
        </div>
        <div className="iznadIIspod"></div>
      </div>
    );
  }
}
