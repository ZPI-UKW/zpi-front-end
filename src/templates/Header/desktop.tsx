import { Button, createStyles, Hidden, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useAuthContextState } from '../../context/authContext';
import Navigation from '../../components/navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.primary.main,
    },
    secondaryBtn: {
      color: theme.palette.grey[50],
      marginRight: theme.spacing(2),
      borderColor: theme.palette.grey[50],
    },
    iconButton: {
      color: theme.palette.grey[50],
    },
  })
);

const DesktopContent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { isAuthenticated } = useAuthContextState();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Hidden xsDown>
      <Link to="/create-advertisement">
        <Button variant="outlined" className={clsx(classes.button, classes.secondaryBtn)}>
          Dodaj ogłoszenie
        </Button>
      </Link>
      {isAuthenticated() ? (
        <IconButton
          aria-controls="navigation-menu"
          aria-haspopup="true"
          className={classes.iconButton}
          aria-label="Otwórz menu"
          onClick={handleClick}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      ) : (
        <Button variant="contained" className={classes.button}>
          Zaloguj się
        </Button>
      )}
      <Navigation anchorEl={anchorEl} setAnchorEl={setAnchorEl} type="desktop" />
    </Hidden>
  );
};

export default DesktopContent;
