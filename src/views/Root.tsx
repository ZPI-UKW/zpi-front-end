import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../templates/Header';
import MainTemplate from '../templates/Main';
import CreateAnnoucements from './CreateAnnoucements';
import MyAnnoucements from './MyAnnoucements/myAnnoucements';
import MyRentals from './MyRentals/myRentals';

const Root = () => (
  <Router>
    <MainTemplate>
      <Switch>
        <Header>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/create-advertisement">
            <CreateAnnoucements />
          </Route>
          <Route path="/edit-advertisement/:addId">
            <CreateAnnoucements />
          </Route>
          <Route path="/profile">
            <h1>Profile</h1>
          </Route>
          <Route path="/my-advertisements">
            <MyAnnoucements />
          </Route>
          <Route path="/my-rentals">
            <MyRentals />
          </Route>
          <Route exact path="/category/:categoryName">
            <h1>Category name like vehicles or books</h1>
          </Route>
          <Route exact path="/category/:categoryName/:adId">
            <h1>Category name like vehicles or books and advertisement Id</h1>
          </Route>
        </Header>
      </Switch>
    </MainTemplate>
  </Router>
);

export default Root;
