import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as userService from '../../services/UserService'


class SearchPublisher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",

      publishersToShow: [],
      

    }

   
  }



  onChangeInput = async (input) => {
    if (input.length == 0) {
        this.setState({ publishersToShow: [] });
        return;
      }
    this.setState({ publishersToShow: await userService.searchPublishers(input) });
  }




 


  render() {

    return (

       
                  <Typeahead 
                    id="basic-example"
                    labelKey="name"
                    
                    onChange={selected => this.props.selectPublisher(selected)}
                    options={this.state.publishersToShow}
                    placeholder="Unesite ime izdavaca"
                    labelKey="username"
                    onInputChange={input => this.onChangeInput(input)}
                  />
            
      

    )
  }

}

export default SearchPublisher




