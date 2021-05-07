import { AppBar, Toolbar, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import DesktopContent from './desktop';
import MobileContent from './mobile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    toolbar: {
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
      },
    },
  })
);

const Header = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <AppBar
        position={matches ? 'static' : 'fixed'}
        className={!matches ? classes.appBar : undefined}
      >
        <Toolbar className={classes.toolbar}>
          <DesktopContent isLoggedIn />
          <MobileContent />
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Header;
