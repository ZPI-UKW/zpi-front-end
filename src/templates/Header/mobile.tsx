import { Container, createStyles, Hidden, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import Navigation from '../../components/Navigation';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useState } from 'react';
import { useAuthContextState } from '../../context/authContext';
import { NavigationProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      margin: `0 ${theme.spacing(1)}px`,
    },
    iconButton: {
      width: '100%',
      color: theme.palette.grey[50],
    },
    iconButtonLabel: {
      display: 'flex',
      flexDirection: 'column',
    },
    buttonGroup: {
      width: 'fit-content',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 33.3%)',
    },
  })
);

const MobileContent = ({ handleDialogOpen, logout }: NavigationProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated } = useAuthContextState();
  const classes = useStyles();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Hidden smUp>
      <Container className={classes.buttonGroup}>
        <div className={classes.link}>
          <IconButton
            classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
            aria-label="Otwórz menu"
            onClick={handleClick}
          >
            <MenuIcon fontSize="large" />
            <p>Menu</p>
          </IconButton>
        </div>
        <Link to="/create-advertisement" className={classes.link}>
          <IconButton
            classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
            aria-label="Dodaj ogłoszenie"
          >
            <AddCircleOutlineIcon fontSize="large" />
            <p>Dodaj</p>
          </IconButton>
        </Link>
        {isAuthenticated() ? (
          <Link to="/create-advertisement" className={classes.link}>
            <IconButton
              classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
              aria-label="Przejdź do profilu"
            >
              <PersonIcon fontSize="large" />
              <p>Profil</p>
            </IconButton>
          </Link>
        ) : (
          <div className={classes.link}>
            <IconButton
              classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
              aria-label="Zaloguj się do serwisu"
              onClick={handleDialogOpen}
            >
              <PersonAddIcon fontSize="large" />
              <p>Zaloguj</p>
            </IconButton>
          </div>
        )}
      </Container>
      <Navigation anchorEl={anchorEl} setAnchorEl={setAnchorEl} type="mobile" logoutFun={logout} />
    </Hidden>
  );
};

export default MobileContent;
