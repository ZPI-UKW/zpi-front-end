import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'moment/locale/pl';
import { AuthProvider } from '../../context/auth/authContext';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/material-theme';
import useStyles from './styles';
import CategoryProvider from '../../context/category/categoryContext';
import FetchTemplate from '../Fetch';

console.log(process.env.REACT_APP_BACK_END_URL);

const link = createHttpLink({
  uri: `${process.env.REACT_APP_BACK_END_URL}/graphql`,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <CategoryProvider>
        <AuthProvider>
          <FetchTemplate>
            <MuiPickersUtilsProvider utils={MomentUtils} locale={moment.locale('pl')}>
              <ThemeProvider theme={theme}>
                <SnackbarProvider className={classes.contentRoot} maxSnack={3}>
                  {children}
                </SnackbarProvider>
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </FetchTemplate>
        </AuthProvider>
      </CategoryProvider>
    </ApolloProvider>
  );
};

export default MainTemplate;
