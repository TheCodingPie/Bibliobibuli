import React, { Component } from "react";
import "../../styles/login.css";
import {Modal,Button} from 'react-bootstrap'

import * as topicService from '../../services/TopicService'
let timer;
//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class AddTopic extends Component {
  constructor(props) {
    super(props);
    (this.props.location.state==undefined) ? this.state = {goBack:true }
    :
    this.state = {
      topic: "",
      description: "",
      user:this.props.location.state.user,
      successful: "",
      borderColor: "lightgray",
      modalShow:false,
      goBack:false
     
    };
  }
  handleChangeTopic(event) {
    this.setState({
      topic: event.target.value,
      borderColor: "lightgrey",
      successful: ""
    });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  goToFP=()=>{
    clearInterval(timer);
    this.props.history.push({
      pathname: `/FirstPageUser`,
    state: { user: this.state.user }
    });
    }
createTopic = async () => {
    if (
      this.state.topic == "" ||
      this.state.description == "" 
     
    ) {
     this.setState({modalShow:true});
      return;
    }
         console.log(this.state.user);
        var res= await topicService.addTopic(this.state.topic,this.state.description,this.state.user,Date.now());
           
        if(res=='Uspesno ste dodali temu')   
               timer= setInterval(this.goToFP,1500);
            
          this.setState({successful:res});
           
            

  };

  render() {
   
    
    return (
      (this.state.goBack)?(<label>Vratite se nazad</label>):
      
      (<div className="celaStrana">
        <div style={{display:'flex',flex:10}}></div>
        <div style={{display:'flex',flex:5,flexDirection:'row',width:'100%'}}>
          <div className="iznadIIspod1"></div>
          <div className="login">
          <div style={{display:'flex',flex:2}}></div>
          <label><span class="badge badge-info"><h3><strong>Pokretanje teme</strong></h3></span></label> <br/>
            <div style={{display:'flex',flex:2}}></div>
            <div className="form-group">
              <label>Naslov</label>
              <div style={{display:'flex',flex:2}}></div>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite naslov teme"
                onChange={this.handleChangeTopic.bind(this)}
                style={{
                  borderColor: this.state.borderColor
                }}
              />
            </div>
            <div style={{display:'flex',flex:2}}></div>
            <div className="form-group">
              <label>Opis</label>
              <div style={{display:'flex',flex:2}}></div>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite opis teme"
                onChange={this.handleChangeDescription.bind(this)}
              />
            </div>
            <div style={{display:'flex',flex:2}}></div>
           
            
            
            <button
              type="submit"
              className="btn  btn-block"
              style={{
                backgroundColor: "#ff0178",
                    color: "white",
              }}
              onClick={this.createTopic}
            >
             <h4> Kreiraj temu</h4>
            </button>
            <label
              style={{
                alignSelf: "center",
                color: "red"
              }}
            >
              {this.state.successful}
            </label>
            <div style={{display:'flex',flex:2}}></div>
          </div>
          <div className="iznadIIspod1"></div>
        </div>
        <div style={{display:'flex',flex:10}}></div>

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

      </div>)
    );
  }
}
