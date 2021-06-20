import {
  Box,
  Button,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useAuthContextState } from '../../context/auth/authContext';
import Navigation from '../../components/Navigation';
import { NavigationProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mainLink: {
      color: theme.palette.grey[50],
    },
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

const DesktopContent = ({ handleDialogOpen }: NavigationProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { isAuthenticated } = useAuthContextState();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Hidden xsDown>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.mainLink}>
          <Typography variant="h3" component="h1">
            Rentoo
          </Typography>
        </Link>
        <div>
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
            <Button variant="contained" className={classes.button} onClick={handleDialogOpen}>
              Zaloguj się
            </Button>
          )}
        </div>
      </div>
      <Navigation anchorEl={anchorEl} setAnchorEl={setAnchorEl} type="desktop" />
    </Hidden>
  );
};

export default DesktopContent;
