import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import { Grid } from '@material-ui/core';
import useStyles from '../MyAnnoucements/styles';

const MyRentals = () => {
  const [annoucements, setAnnoucements] = useState<Annoucements[]>([]);
  const classes = useStyles();

  useEffect(() => {
    setAnnoucements(ann);
  }, []);

  return (
    <ViewContainer>
      <ViewTitle>Moje wypozyczenia</ViewTitle>
      <CardsContainer>
        {annoucements.map((el) => (
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
            <Card
              variant="rentals"
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

export default MyRentals;
