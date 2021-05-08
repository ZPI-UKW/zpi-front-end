import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Wrapper from '../templates/Wrapper';
import MainTemplate from '../templates/Main';
import Main from './Main';

const Root = () => (
  <Router>
    <MainTemplate>
      <Switch>
        <Wrapper>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/create-advertisement">
            <h1>Create advertisement</h1>
          </Route>
          <Route path="/edit-advertisement">
            <h1>Edit advertisement</h1>
          </Route>
          <Route path="/profile">
            <h1>Profile</h1>
          </Route>
          <Route path="/my-advertisements">
            <h1>My advertisement</h1>
          </Route>
          <Route path="/my-rentals">
            <h1>My rentals</h1>
          </Route>
          <Route exact path="/category/:categoryName">
            <h1>Category name like vehicles or books</h1>
          </Route>
          <Route exact path="/category/:categoryName/:adId">
            <h1>Category name like vehicles or books and advertisement Id</h1>
          </Route>
        </Wrapper>
      </Switch>
    </MainTemplate>
  </Router>
);

export default Root;
