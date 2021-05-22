import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/styles';
import { AuthProvider } from '../../context/authContext';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/material-theme';

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const MainTemplate = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>
);

export default MainTemplate;
