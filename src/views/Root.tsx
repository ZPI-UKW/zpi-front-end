import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Wrapper from '../templates/Wrapper';
import MainTemplate from '../templates/Main';
import AnnoucementForm from './AnnoucementForm';
import Main from './Main';
import MyAnnoucements from './MyAnnoucements';
import MyRentals from './MyRentals';
import AnnoucementsList from './AnnouncementsList';
import Product from './Product';
import Profile from './Profile';
import AuthRoute from '../components/AuthRoute';
import Statute from './Statute';

const Root = () => (
  <Router>
    <MainTemplate>
      <Switch>
        <Wrapper>
          <Route exact path="/">
            <Main />
          </Route>
          <AuthRoute path="/create-advertisement">
            <AnnoucementForm />
          </AuthRoute>
          <AuthRoute path="/edit-advertisement/:addId">
            <AnnoucementForm />
          </AuthRoute>
          <AuthRoute path="/profile">
            <Profile />
          </AuthRoute>
          <AuthRoute path="/my-advertisements">
            <MyAnnoucements />
          </AuthRoute>
          <AuthRoute path="/my-rentals">
            <MyRentals />
          </AuthRoute>
          <Route path="/statute">
            <Statute />
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
