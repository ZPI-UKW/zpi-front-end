import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import CardsContainer from '../../components/CardsContainer';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import useStyles from './styles';
import { Grid } from '@material-ui/core';

const MyAnnoucements = () => {
  const [annoucements, setAnnoucements] = useState<Annoucements[]>([]);
  const classes = useStyles();

  useEffect(() => {
    setAnnoucements(ann);
  }, []);

  return (
    <ViewContainer>
      <ViewTitle>Moje ogłoszenia</ViewTitle>
      <CardsContainer>
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
        {annoucements.map((el) => (
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
            <Card
              variant="your"
              key={el._id}
              title={el.title}
              price={el.costs.day}
              _id={el._id}
              images={el.images}
              categoryId={el.categoryId}
              location={el.location}
            />
          </Grid>
        ))}
      </CardsContainer>
    </ViewContainer>
  );
};

export default MyAnnoucements;
