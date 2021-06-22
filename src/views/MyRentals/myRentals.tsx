import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';

const MyRentals = () => {
  const [annoucements, setAnnoucements] = useState<Annoucements[]>([]);

  useEffect(() => {
    setAnnoucements(ann);
  }, []);

  return (
    <ViewContainer>
      <ViewTitle>Moje wypożyczenia</ViewTitle>
      <CardsContainer>
        {annoucements.map((el) => (
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
        ))}
      </CardsContainer>
    </ViewContainer>
  );
};

export default MyRentals;
