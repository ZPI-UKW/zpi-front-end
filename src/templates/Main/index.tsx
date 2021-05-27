import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/styles';
import { AuthProvider } from '../../context/authContext';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/material-theme';
import { SnackbarProvider } from 'notistack';
import useStyles from './styles';

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
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider className={classes.contentRoot} maxSnack={3}>
            <GlobalStyles />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MainTemplate;
