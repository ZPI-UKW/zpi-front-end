import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../templates/Header';
import GlobalStyles from '../theme/globalStyles';
import theme from '../theme/material-theme';

const Root = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Header>
          <Route exact path="/">
            <h1>Home</h1>
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
        </Header>
      </Switch>
    </ThemeProvider>
  </Router>
);

export default Root;
