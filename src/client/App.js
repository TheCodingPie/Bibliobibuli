import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Components from './components'; // ovako su importovane sve komponente iz foldera, dole poziv

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
           <Route path="/" exact component={Components.CreateProfileUser} />
    
        </Switch>
     </Router>
    </div>
  );
}

export default App;
