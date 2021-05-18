import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import { CardsContainer } from '../../components/CardsContainer/cardsContainer';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addItemBox: {
      background: '#E5E7EB',
      color: '#9CA3AF',
      display: 'grid',
      placeItems: 'center',
      borderRadius: theme.shape.borderRadius,
      '& div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    plusIcon: {
      width: '25%',
      height: '25%',
      strokeWidth: '1px',
    },
  })
);

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
        {annoucements.map((el) => (
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
        ))}
        <Link to="/create-advertisement" className={classes.addItemBox}>
          <Box>
            <AddIcon className={classes.plusIcon} />
            <Typography color="textSecondary" variant="h4" component="span">
              Dodaj ogłoszenie
            </Typography>
          </Box>
        </Link>
      </CardsContainer>
    </ViewContainer>
  );
};

export default MyAnnoucements;
