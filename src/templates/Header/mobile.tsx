import { Container, createStyles, Hidden, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import Navigation from '../../components/navigation';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

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

const buttonsData = [
  {
    label: 'Menu',
    icon: <MenuIcon fontSize="large" />,
    aria: 'Otwórz menu',
  },
  {
    to: '/create-advertisement',
    label: 'Dodaj',
    icon: <AddCircleOutlineIcon fontSize="large" />,
    aria: 'Dodaj nowe ogłoszenie',
  },
  {
    to: '/profile',
    label: 'Profil',
    icon: <PersonIcon fontSize="large" />,
    aria: 'Edytuj profil',
  },
];

const MobileContent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Hidden smUp>
      <Container className={classes.buttonGroup}>
        {buttonsData.map((el) => {
          return el.to ? (
            <Link key={el.label} to={el.to} className={classes.link}>
              <IconButton
                classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
                aria-label={el.aria}
              >
                {el.icon}
                <p>{el.label}</p>
              </IconButton>
            </Link>
          ) : (
            <div key={el.label} className={classes.link}>
              <IconButton
                classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
                aria-label={el.aria}
                onClick={handleClick}
              >
                {el.icon}
                <p>{el.label}</p>
              </IconButton>
            </div>
          );
        })}
      </Container>
      <Navigation anchorEl={anchorEl} setAnchorEl={setAnchorEl} type="mobile" />
    </Hidden>
  );
};

export default MobileContent;
