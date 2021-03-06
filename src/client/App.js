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
import AddBookSale from './components/user/addBookSale';
import BookDetailTrade from './components/user/bookDetailesTrade';
import AddNewBook from './components/publisher/AddNewBook';
import SeeMyBooks from './components/publisher/SeeMyBooks';
import SeeBook from './components/publisher/SeeBook';
import PublisherFirstPage from './components/publisher/PublisherFirstPage';
import SearchNewBooks from './components/user/SearchNewBooks';
import SeeNewBookUser from './components/user/SeeNewBookUser';
import BuyNewBook from './components/user/BuyNewBook';
import PublisherProfile from './components/user/PublisherProfile'
import UserProfile from './components/user/userProfile';
import BookDetailAuction from './components/user/bookDetailesAuction';
import OrdersPage from './components/user/ordersPage';


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
           <Route path="/AddBookSale" exact component={AddBookSale} />
           <Route path="/bookDetailTrade" exact component={BookDetailTrade} />
           <Route path="/bookDetailAuction" exact component={BookDetailAuction} />
           <Route path="/AddNewBook" exact component={AddNewBook} />
           <Route path="/SeeMyBooks" exact component={SeeMyBooks} />
           <Route path="/SeeBook" exact component={SeeBook} />
           <Route path="/PublisherFirstPage" exact component={PublisherFirstPage} />
           <Route path="/SearchNewBooks" exact component={SearchNewBooks} />
           <Route path="/SeeNewBookUser" exact component={SeeNewBookUser} />
           <Route path="/BuyNewBook" exact component={BuyNewBook} />
           <Route path="/PublisherProfile" exact component={PublisherProfile} />
           <Route path="/UserProfile" exact component={UserProfile} />
           <Route path="/OrdersPage" exact component={OrdersPage} />
    
        </Switch>
     </Router>
    </div>
  );
}

export default App;
