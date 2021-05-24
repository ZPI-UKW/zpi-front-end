import { Button, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { AnnoucementProps } from './types';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Annoucement = ({ annoucement }: AnnoucementProps) => {
  const classes = useStyles();

  return (
    <>
      <Hidden xsDown>
        <Typography variant="subtitle1" component="p">
          Kategorie {'>'} Pojazdy
        </Typography>
      </Hidden>
      <div className={classes.titleContainer}>
        <Link className={classes.link} to="/category/examplecategory">
          <ArrowBackIosIcon width={1} />
        </Link>
        <Hidden xsDown>
          <Typography variant="h3" component="h2">
            {annoucement.title}
          </Typography>
        </Hidden>
      </div>
      <Grid container>
        <Grid item xs={12} sm={6} md={8}>
          <img className={classes.image} src={annoucement.images[0]} alt="" />
          <Hidden xsDown>
            <Paper className={clsx(classes.paper, classes.description)} elevation={4}>
              <Typography variant="h4">Opis</Typography>
              <Typography>{annoucement.description}</Typography>
            </Paper>
          </Hidden>
        </Grid>
        <Grid className={classes.content} item xs={12} sm={6} md={4}>
          <Hidden smUp>
            <Typography variant="h3" component="h2">
              {annoucement.title}
            </Typography>
          </Hidden>
          <div className={classes.rentContainer}>
            <Button variant="contained" color="primary">
              Wypożycz
            </Button>
          </div>
          <Paper className={classes.paper} elevation={4}>
            <div className={classes.paperTitle}>
              <PersonOutlineOutlinedIcon />
              <Typography variant="h4">Dodane przez</Typography>
            </div>
            <Typography>Irek</Typography>
          </Paper>
          <Paper className={classes.paper} elevation={4}>
            <div className={classes.paperTitle}>
              <RoomOutlinedIcon />
              <Typography variant="h4">Lokalizacja</Typography>
            </div>
            <Typography>{annoucement.location}</Typography>
          </Paper>
          <Paper className={classes.paper} elevation={4}>
            <div className={classes.paperTitle}>
              <CallOutlinedIcon />
              <Typography variant="h4">Kontakt</Typography>
            </div>
            <Typography>{annoucement.phone}</Typography>
            <Typography>{annoucement.email}</Typography>
          </Paper>
          <Paper className={classes.paper} elevation={4}>
            <div className={classes.paperTitle}>
              <MonetizationOnOutlinedIcon />
              <Typography variant="h4">Cennik</Typography>
            </div>
            <div className={classes.costs}>
              <Typography>1 dzień</Typography>
              <Typography>{annoucement.costs.day} zł</Typography>
            </div>
            <div className={classes.costs}>
              <Typography>1 tydzień (7 dni)</Typography>
              <Typography>{annoucement.costs.week} zł</Typography>
            </div>
            <div className={classes.costs}>
              <Typography>1 miesiąc (30 dni)</Typography>
              <Typography>{annoucement.costs.month} zł</Typography>
            </div>
          </Paper>
          <Hidden smUp>
            <Paper className={classes.paper} elevation={4}>
              <Typography variant="h4">Opis</Typography>
              <Typography>{annoucement.description}</Typography>
            </Paper>
          </Hidden>
        </Grid>
      </Grid>
    </>
  );
};

export default Annoucement;
