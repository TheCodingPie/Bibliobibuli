import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProfileUser from './components/createProfileUser';
import CreateProfilePublisher from './components/createProfilePublisher';
import LoginUser from './components/loginUser';
import LoginPublisher from './components/loginPublisher';
import FirstPageUser from './components/user/firstPageUser';
import AddBook from './components/user/addBookExchange';
import ChangeAdressUser from './components/user/changeAdress';
import AddBookSale from './components/user/addBookSale';
import BookDetailTrade from './components/user/bookDetailesTrade';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
           <Route path="/" exact component={CreateProfileUser} />
           <Route path="/CreateProfilePublisher" exact component={CreateProfilePublisher} />
           <Route path="/LoginUser" exact component={LoginUser} />
           <Route path="/LoginPublisher" exact component={LoginPublisher} />
           <Route path="/FirstPageUser" exact component={FirstPageUser} />
           <Route path="/AddBook" exact component={AddBook} />
           <Route path="/ChangeAdressUser" exact component={ChangeAdressUser} />
           <Route path="/AddBookSale" exact component={AddBookSale} />
           <Route path="/bookDetailTrade" exact component={BookDetailTrade} />
    
        </Switch>
     </Router>
    </div>
  );
}

export default App;
