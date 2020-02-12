import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProfileUser from './components/createProfileUser';
import CreateProfilePublisher from './components/createProfilePublisher';
import Login from './components/login';

import FirstPageUser from './components/user/firstPageUser';
import AddBook from './components/user/addBookExchange';
import AddTopic from './components/user/addTopic';
import SeeTopics from './components/user/seeTopics';
import ShowTopic from './components/user/showTopic';
import ChangeAdressUser from './components/user/changeAdress';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
           <Route path="/CreateProfileUser" exact component={CreateProfileUser} />
           <Route path="/CreateProfilePublisher" exact component={CreateProfilePublisher} />
           <Route path="/" exact component={Login} />
          
           <Route path="/FirstPageUser" exact component={FirstPageUser} />
           <Route path="/AddBook" exact component={AddBook} />
           <Route path="/AddTopic" exact component={AddTopic} />
           <Route path="/SeeTopics" exact component={SeeTopics} />
           <Route path="/ShowTopic" exact component={ShowTopic} />
           <Route path="/ChangeAdressUser" exact component={ChangeAdressUser} />
    
        </Switch>
     </Router>
    </div>
  );
}

export default App;
