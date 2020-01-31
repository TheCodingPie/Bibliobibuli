import React, { Component } from "react";
import * as userService from '../../services/UserService'

export default class ChangeAdressUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
     address: "",
     user:this.props.location.state.user,
      response:""
    };
  }
  handleChangeAdress(event) {
    this.setState({ address: event.target.value, color: "lightgrey",response:"" });
  }
  ChangeAdressUser=async()=>{
      if(this.state.address=="")
      return;
      var response=await userService.changeAdress(this.state.user.username,this.state.address);
      if(response=="true")
      this.setState({response:"Uspesno ste promenili adresu",address:""});
      else
      this.setState({response:"Niste uspeli da promenite adresu pokusajte ponovo"});
  }


  render() {
   
    return (
      <div className="celaStrana">
        <div className="iznadIIspod">
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
                  placeholder="Unesite adresu"
                  value={this.state.address}
                  onChange={this.handleChangeAdress.bind(this)}
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
                  onClick={() => this.ChangeAdressUser()}
                >
                  <h5>Promenite adresu</h5>
               
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