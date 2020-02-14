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
        <div className="iznadIIspod"></div>
        <div className="horizontalno">
          <div className="iznadIIspod1"></div>
          <div className="login">
            <h3
              style={{
                alignSelf: "center"
              }}
            >
              Pokretanje teme
            </h3>

            <div className="form-group">
              <label>Naslov</label>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite temu"
                onChange={this.handleChangeTopic.bind(this)}
                style={{
                  borderColor: this.state.borderColor
                }}
              />
            </div>

            <div className="form-group">
              <label>Opis</label>
              <input
                type="text"
                className="form-control"
                placeholder="Unesite opis"
                onChange={this.handleChangeDescription.bind(this)}
              />
            </div>

           
            
            
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.createTopic}
            >
              Kreiraj temu
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

      </div>)
    );
  }
}
