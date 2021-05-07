import { Container, createStyles, Hidden, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';

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
    to: '/my-advertisements',
    label: 'Dodane',
    icon: <EventNoteIcon fontSize="large" />,
    aria: 'Twoje przedmioty',
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
  const classes = useStyles();

  return (
    <Hidden smUp>
      <Container className={classes.buttonGroup}>
        {buttonsData.map((el) => (
          <Link to={el.to} className={classes.link}>
            <IconButton
              classes={{ label: classes.iconButtonLabel, root: classes.iconButton }}
              aria-label={el.aria}
            >
              {el.icon}
              <p>{el.label}</p>
            </IconButton>
          </Link>
        ))}
      </Container>
    </Hidden>
  );
};

export default MobileContent;
