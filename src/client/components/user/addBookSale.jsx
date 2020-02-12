import React from 'react';
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import firebase from '../../config/firebaseConfig'
import { FormControl, Button, Col, Image, Container, Row, Media, Modal} from 'react-bootstrap';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import moment from "moment";
import * as boo from '../../services/UserService'
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
var storageRef = firebase.storage().ref();

class AddBookSale extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      urlImage: null,
     
      urlImageLocal: null,
      tagInputValue: "",
      arrayTags: [],
      aboutImage: "",
      modalShow: false,
      user: this.props.location.state.user,
      idPhoto:0,
      nameAuthor:"",
      lastnameAuthor:"",
      name:"",
      bookType:"",
      aboutBook:"",
      publishing:"",
      yearPublishing:2020,
      startPrice:0,
      dateEnd:new Date(),
      time:moment().format("HH:mm"),
      
    };
    console.log(this.state.user)//TREBA IZBRISATI
    this.onChangeImage = this.onChangeImage.bind(this);
    this.addToFirebase = this.addToFirebase.bind(this);
  }
  handleChangeNameAuthor=(e)=>{
      this.setState({nameAuthor:e.target.value})
  }
  handleChangeLastnameAuthor=(e)=>{
    this.setState({lastnameAuthor:e.target.value})
}
handleChangeName=(e)=>{
    this.setState({name:e.target.value})
}
handleChangeBookType=(e)=>{
    this.setState({bookType:e.target.value})
}
handleChangePublishing=(e)=>{
  this.setState({publishing:e.target.value})
}
handleChangeYearPublishing=(e)=>{
  this.setState({yearPublishing:e.target.value})
}
handleChangeStartPrice=(e)=>{
  this.setState({startPrice:e.target.value})
}
handleChangeDate=async date=>{
  this.setState({dateEnd:date})
}
handleChangeTime=async time=>{
  if(time==null) return
 this.setState({timeEnd:time.format("HH:mm")})
}

  componentDidMount = async () => {
    this.setState({ idPhoto: parseInt(await userService.returnImageNumber(this.state.user.username)) });
    console.log(this.state.idPhoto)
   // await bookService.addBook()
  }


 
  saveImageToDataBase = async () => {
   // var idImage = await BaseService.addImageToImageTable(this.state.username, this.state.arrayTags, this.state.urlImage, this.state.aboutImage);
    //var tags = await BaseService.addTagsToTable(this.state.username, this.state.idPhoto, this.state.urlImage, this.state.arrayTags);
    this.setState({ modalShow: true })

  }



  onChangeImage(e) {
    this.setState({ file: e.target.files[0] });
    this.setState({ idPhoto: this.state.idPhoto  });
    this.setState({ urlImageLocal: URL.createObjectURL(e.target.files[0]) });

  }


  addToFirebase = async () => {
   await storageRef.child(this.state.user.username.toString() + '/' + this.state.idPhoto.toString()).put(this.state.file);
   await storageRef.child(this.state.user.username.toString() + '/' + this.state.idPhoto.toString()).getDownloadURL().then((url) => this.setState({ urlImage: url }));
    await bookService.addBookSale(this.state.name,this.state.nameAuthor,this.state.lastnameAuthor,this.state.user.username,this.state.bookType,this.state.idPhoto,this.state.startPrice,[],this.state.dateEnd,this.state.time,0,null,this.state.aboutBook,parseInt(this.state.yearPublishing),this.state.publishing,this.state.urlImage)
  this.setState({name:"",lastnameAuthor:"",nameAuthor:"",bookType:"",publishing:"",yearPublishing:2020,aboutBook:""})
  }



  handleTagChange = (e) => {
    this.setState({ tagInputValue: e.target.value });
  }


 

  onChangeAbout = (e) => {
    this.setState({ aboutBook: e.target.value });
  }




  render() {

    return (
      <div style={{ flexGrow: 1, width: '100%' }}>

        <Container>
          <Row>
            <Col></Col>

            <Col xs={9}>
              <h5>Dodavanje fotografije</h5>
              <div class="custom-file mb-3 mt-3" >
                <input type="file" class="custom-file-input" id="inputGroupFile04" onChange={this.onChangeImage} />
                <label class="custom-file-label" for="inputGroupFile04">Izaberite fotografiju</label>
                <br />
              </div>

              <Container class="mt-6">
                <Col xs={12}>
                  <Media >
                    <Image width={250}
                      height={250}
                      className="align-self-start mr-3"
                      src={this.state.urlImageLocal} />

                    <Media.Body xs={2}>
                      <FormControl as="textarea" aria-label="With textarea" placeholder="Unesite opis fotografije" onChange={this.onChangeAbout} />
                    </Media.Body>

                  </Media>

                </Col>

              </Container>
              <div>
            
                <br />
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Ime knjige</label>
                    <input     type="text"
                  className="form-control"
                  placeholder="Unesite korisnicko ime"
                  value={this.state.name}
                  onChange={this.handleChangeName.bind(this)}
                  ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Ime autora</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite korisnicko ime"
                        value={this.state.nameAuthor}
                        onChange={this.handleChangeNameAuthor.bind(this)}
                        ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Prezime autora</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite korisnicko ime"
                        value={this.state.lastnameAuthor}
                        onChange={this.handleChangeLastnameAuthor.bind(this)}
                        ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Tip knjige</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite korisnicko ime"
                        value={this.state.bookType}
                        onChange={this.handleChangeBookType.bind(this)}
                        ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Godina Izdavanja</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Godina izdavanja"
                        value={this.state.yearPublishing}
                        onChange={this.handleChangeYearPublishing.bind(this)}
                        ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Izdavanje</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite korisnicko ime"
                        value={this.state.publishing}
                        onChange={this.handleChangePublishing.bind(this)}
                        ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Pocetna cena</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite pocetnu cenu"
                        value={this.state.startPrice}
                        onChange={this.handleChangeStartPrice.bind(this)}
                        ></input>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>Datum</label>
                    <DatePicker
                        selected={this.state.dateEnd}
                        onChange={this.handleChangeDate}
                        />
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <label>vreme kraja ponude</label>
                    <TimePicker
                         style={{ width: 100 }}
                         showSecond={false}
                         defaultValue={moment()}
                         className="xxx"
                        onChange={this.handleChangeTime}
                        />
                </div>

              </div>
              <br />
              <div class="d-flex flex-row-reverse bd-highlight">
                <button class="btn btn-primary" onClick={() => this.addToFirebase()} >Dodaj knjigu</button>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.props.history.push({
            pathname: `/searchBarPage`,
            state: { person: "aa" }
          })}
        />
      </div>
    )
  }
}

export default AddBookSale

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h5>Uspesno ste dodali fotografiju</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>U redu</Button>
      </Modal.Footer>
    </Modal>
  );
}