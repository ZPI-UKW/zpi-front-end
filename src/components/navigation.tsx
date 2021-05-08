import { createStyles, Divider, makeStyles, Menu, MenuItem, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuthContextState } from '../context/authContext';
import Transition from './transition';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      '& li': {
        fontSize: '1.8rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.8rem',
        },
      },
      '& a': {
        color: theme.palette.primary.main,
      },
      '& .logout': {
        color: theme.palette.error.main,
      },
    },
    paper: {
      width: '100%',
      maxWidth: '100%',
      left: 0,
      right: 0,
    },
  })
);

const Navigation = ({
  type = 'desktop',
  anchorEl,
  setAnchorEl,
}: {
  type: 'desktop' | 'mobile';
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) => {
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
