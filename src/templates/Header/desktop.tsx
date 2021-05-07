import { Button, createStyles, Hidden, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

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

const DesktopContent = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Link to="/create-advertisement">
        <Button variant="outlined" className={clsx(classes.button, classes.secondaryBtn)}>
          Dodaj ogłoszenie
        </Button>
      </Link>
      {isLoggedIn ? (
        <IconButton className={classes.iconButton} aria-label="Otwórz menu">
          <MenuIcon fontSize="large" />
        </IconButton>
      ) : (
        <Button variant="contained" className={classes.button}>
          Zaloguj się
        </Button>
      )}
    </Hidden>
  );
};

export default DesktopContent;
