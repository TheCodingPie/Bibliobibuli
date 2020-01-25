import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProfileUser from './components/createProfileUser';
import CreateProfilePublisher from './components/createProfilePublisher';
import LoginUser from './components/loginUser';
import LoginPublisher from './components/loginPublisher';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
           <Route path="/" exact component={CreateProfileUser} />
           <Route path="/CreateProfilePublisher" exact component={CreateProfilePublisher} />
           <Route path="/LoginUser" exact component={LoginUser} />
           <Route path="/LoginPublisher" exact component={LoginPublisher} />
    
        </Switch>
     </Router>
    </div>
  );
}

export default App;
