import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
import Slider from './annoucement.slider';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { useState } from 'react';
import RentDialog from '../RentDialog';
import { useAuthContextState } from '../../context/auth/authContext';

const Annoucement = ({ annoucement }: AnnoucementProps) => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userInfo } = useAuthContextState();

  const handleClose = () => setIsDialogOpen(false);
  const handleOpen = () => setIsDialogOpen(true);

  return (
    <>
      <Hidden xsDown>
        <Typography variant="subtitle1" component="p" className={classes.category}>
          <Link className={clsx(classes.link, classes.hoveredLink)} to="/">
            Kategorie
          </Link>
          &nbsp;{'>'}&nbsp;
          <Link
            className={clsx(classes.link, classes.hoveredLink)}
            to={`/search/category/${annoucement.categoryId.englishName}`}
          >
            <span className={classes.capitalize}>{annoucement.categoryId.name}</span>
          </Link>
        </Typography>
      </Hidden>
      <div className={classes.titleContainer}>
        <Link
          className={classes.link}
          to={`/search/category/${annoucement.categoryId.englishName}`}
        >
          <ArrowBackIosIcon width={1} />
        </Link>
        <Hidden xsDown>
          <Typography variant="h3" component="h2">
            {annoucement.title}
          </Typography>
        </Hidden>
      </div>
      <Grid container>
        <Grid item xs={12} sm={7} md={8}>
          <div className={classes.sliderContainer}>
            {annoucement.images.length > 0 ? (
              <Slider images={annoucement.images} />
            ) : (
              <ImageOutlinedIcon />
            )}
          </div>
          <Hidden xsDown>
            <Paper className={clsx(classes.paper, classes.description)} elevation={4}>
              <Typography variant="h4">Opis</Typography>
              <Typography>{annoucement.description}</Typography>
            </Paper>
          </Hidden>
        </Grid>
        <Grid className={classes.content} item xs={12} sm={5} md={4}>
          <Hidden smUp>
            <Typography variant="h3" component="h2">
              {annoucement.title}
            </Typography>
          </Hidden>
          {userInfo._id !== annoucement.addedBy._id ? (
            <div className={classes.rentContainer}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Wypo??ycz
              </Button>
            </div>
          ) : null}
          <Paper className={classes.paper} elevation={4}>
            <div className={classes.paperTitle}>
              <PersonOutlineOutlinedIcon />
              <Typography variant="h4">Dodane przez</Typography>
            </div>
            <Typography>{annoucement.addedBy.name}</Typography>
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
              <Typography>1 dzie??</Typography>
              <Typography>{annoucement.costs.day} z??</Typography>
            </div>
            <div className={classes.costs}>
              <Typography>1 tydzie?? (7 dni)</Typography>
              <Typography>{annoucement.costs.week} z??</Typography>
            </div>
            <div className={classes.costs}>
              <Typography>1 miesi??c (30 dni)</Typography>
              <Typography>{annoucement.costs.month} z??</Typography>
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
      <RentDialog
        id={annoucement.id}
        isOpen={isDialogOpen}
        handleClose={handleClose}
        costs={annoucement.costs}
      />
    </>
  );
};

export default Annoucement;
