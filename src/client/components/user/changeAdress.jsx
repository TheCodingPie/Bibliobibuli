import React, { Component } from "react";
import * as userService from '../../services/UserService'
let timer;
export default class ChangeAdressUser extends Component {
  constructor(props) {
    super(props);

    (this.props.location.state==undefined) ? this.state = {goBack:true }
    :
    this.state = {
     address: "",
     user:this.props.location.state.user,
      response:"",
      goBack:false
    };
  }
  handleChangeAdress(event) {
    this.setState({ address: event.target.value, color: "lightgrey",response:"" });
  }
  ChangeAdressUser=async()=>{
      if(this.state.address=="")
      return;
      var response=await userService.changeAdress(this.state.user.username,this.state.address);
      if(response=="true"){
      this.setState({response:"Uspesno ste promenili adresu",address:""});
        timer=setInterval(this.goToFP,2000);
    }
      else
      this.setState({response:"Niste uspeli da promenite adresu pokusajte ponovo"});
  }
goToFP=()=>{
clearInterval(timer);
this.props.history.push({
  pathname: `/FirstPageUser`,
state: { user: this.state.user }
});
}

  render() {
   
    return (
      (this.state.goBack)?(<label>Vratite se nazad</label>)
      :(
      <div className="celaStrana">
        <div style={{display:'flex',flex:10}}>
        </div>
        <div style={{display:'flex',flex:5,flexDirection:'row',width:'100%'}}>
          <div className="iznadIIspod1"></div>
          <div className="centar">
            <div className="login">
            <div style={{display:'flex',flex:3}}></div>
              <div className="Naslov">
              <label><span class="badge badge-info"><h3><strong>Promena adrese</strong></h3></span></label> <br/>
              </div>
              <div style={{display:'flex',flex:3}}></div>
              <div className="form-group">
                <label className="secondary">Nova adresa</label>
                <div style={{display:'flex',flex:3}}></div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unesite novu adresu"
                  value={this.state.address}
                  onChange={this.handleChangeAdress.bind(this)}
                  style={{
                    borderBottomColor: this.state.color
                  }}
                />
              </div>
              <div style={{display:'flex',flex:3}}></div>

             
              <div className="butto">
                <div className="left"></div>
                <button
                  className="btn  btn-block"
                  style={{
                    backgroundColor: "#ff0178",
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flex: 2
                  }}
                  onClick={() => this.ChangeAdressUser()}
                >
                  <h5>Promenite adresu</h5>
               
                </button>
                <div style={{display:'flex',flex:2}}></div>
                <label>{this.state.response}</label>

                <div className="left"></div>
              </div>
              <div className="iznadIIspod"></div>
             
              <div className="iznadIIspod"></div>
            </div>
          </div>
          <div className="iznadIIspod1"></div>
        </div>
        <div style={{display:'flex',flex:10}}></div>
      </div>)
    );
  }
}