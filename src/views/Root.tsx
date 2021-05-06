import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
      <Route exact path="/:categoryName">
        <h1>Category name like vehicles or books</h1>
      </Route>
      <Route path="/:categoryName/:adId">
        <h1>Category name like vehicles or books and advertisement Id</h1>
      </Route>
      <Route path="/create-advertisement">
        <h1>Home</h1>
      </Route>
      <Route path="/edit-advertisement">
        <h1>Home</h1>
      </Route>
      <Route path="/profile">
        <h1>Home</h1>
      </Route>
      <Route path="/my-advertisement">
        <h1>Home</h1>
      </Route>
      <Route path="/my-rentals">
        <h1>Home</h1>
      </Route>
    </Switch>
  </Router>
);

export default Root;
