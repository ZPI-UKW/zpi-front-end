import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pl';
import { AuthProvider } from '../../context/authContext';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/material-theme';
import { SnackbarProvider } from 'notistack';
import useStyles from './styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql',
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
      <MuiPickersUtilsProvider utils={MomentUtils} locale={moment.locale('pl')}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider className={classes.contentRoot} maxSnack={3}>
              <GlobalStyles />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  );
};

export default MainTemplate;
