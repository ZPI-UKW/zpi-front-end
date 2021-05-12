import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import { CardsContainer } from '../../components/CardsContainer/cardsContainer';

const MyAnnoucements = () => {
  const [annoucements, setAnnoucements] = useState<Annoucements[]>([]);

  useEffect(() => {
    setAnnoucements(ann);
  }, []);

  return (
    <Box display="flex" justifyContent="center">
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
      </CardsContainer>
    </Box>
  );
};

export default MyAnnoucements;
