import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Wrapper from '../templates/Wrapper';
import MainTemplate from '../templates/Main';
import AnnoucementForm from './AnnoucementForm';
import Main from './Main';
import MyAnnoucements from './MyAnnoucements';
import MyRentals from './MyRentals/myRentals';
import AnnoucementsList from './AnnouncementsList';
import Product from './Product';

const Root = () => (
  <Router>
    <MainTemplate>
      <Switch>
        <Wrapper>
          <Route exact path="/">
            <Main />
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
          <Route exact path={['/search', '/search/category/:categoryName']}>
            <AnnoucementsList />
          </Route>
          <Route exact path="/category/:categoryName/:adId">
            <Product />
          </Route>
        </Wrapper>
      </Switch>
    </MainTemplate>
  </Router>
);

export default Root;
