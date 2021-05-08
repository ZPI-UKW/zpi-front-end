import {
  Button,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useAuthContextState } from '../../context/authContext';

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
    menu: {
      '& li': {
        fontSize: '1.8rem',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
      '& .logout': {
        color: theme.palette.error.main,
      },
    },
  })
);

const DesktopContent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuthContextState();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <Menu
        id="navigation-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Link to="/my-advertisements">
          <MenuItem onClick={handleClose}>Moje ogłoszenia</MenuItem>
        </Link>
        <Link to="/my-rentals">
          <MenuItem onClick={handleClose}>Wypożyczone przedmioty</MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem onClick={handleClose}>Edytuj profil</MenuItem>
        </Link>
        <Link to="/" className="logout">
          <MenuItem
            onClick={() => {
              handleClose();
              logout();
            }}
          >
            Wyloguj
          </MenuItem>
        </Link>
      </Menu>
    </Hidden>
  );
};

export default DesktopContent;
