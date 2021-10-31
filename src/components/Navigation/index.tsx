import { Divider, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuthContextState } from '../../context/auth/authContext';
import Transition from './transition';
import { useStyles } from './styles';
import { NavigationProps } from './types';

const Navigation = ({ type = 'desktop', anchorEl, setAnchorEl, logoutFun }: NavigationProps) => {
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuthContextState();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="navigation-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={classes.menu}
      TransitionComponent={type === 'mobile' ? Transition : undefined}
      PopoverClasses={type === 'mobile' ? { paper: classes.paper } : undefined}
      marginThreshold={0}
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
      <Link to="/statute">
        <MenuItem onClick={handleClose}>Regulamin</MenuItem>
      </Link>
      {type === 'desktop' ? (
        <Link to="/profile">
          <MenuItem onClick={handleClose}>Edytuj profil</MenuItem>
        </Link>
      ) : null}
      {isAuthenticated() ? (
        <div>
          <Divider />
          <Link to="/" className="logout">
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
                logoutFun();
              }}
            >
              Wyloguj
            </MenuItem>
          </Link>
        </div>
      ) : null}
    </Menu>
  );
};

export default Navigation;
