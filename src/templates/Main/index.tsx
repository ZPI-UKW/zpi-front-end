import { ThemeProvider } from '@material-ui/styles';
import { AuthProvider } from '../../context/authContext';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/material-theme';

const MainTemplate = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default MainTemplate;
