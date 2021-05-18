import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../templates/Header';
import MainTemplate from '../templates/Main';
import AnnoucementForm from './AnnoucementForm';
import MyAnnoucements from './MyAnnoucements';
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
            <AnnoucementForm />
          </Route>
          <Route path="/edit-advertisement/:addId">
            <AnnoucementForm />
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
