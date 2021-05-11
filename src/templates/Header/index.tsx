import { AppBar, Toolbar, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import AuthDialog from '../../components/AuthDialog/dialog';

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
    dialog: {
      fontSize: '1.8rem',
    },
  })
);

const Header = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <AppBar
        position={matches ? 'static' : 'fixed'}
        className={!matches ? classes.appBar : undefined}
      >
        <Toolbar className={classes.toolbar}>
          <DesktopContent handleDialogOpen={handleDialogOpen} />
          <MobileContent handleDialogOpen={handleDialogOpen} />
        </Toolbar>
      </AppBar>
      <AuthDialog
        contentType="signin"
        isDialogOpen={isDialogOpen}
        handleClose={handleDialogClose}
      />
      {children}
    </>
  );
};

export default Header;
