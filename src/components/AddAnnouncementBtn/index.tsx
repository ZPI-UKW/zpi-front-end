import { Box, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const AddAnnouncementButton = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
      <Link to="/create-advertisement" className={classes.addItemBox}>
        <Box>
          <AddIcon className={classes.plusIcon} />
          <Typography color="textSecondary" variant="h4" component="span">
            Dodaj ogłoszenie
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export default AddAnnouncementButton;
