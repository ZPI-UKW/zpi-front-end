import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';

const AnnoucementsList = () => {
  const [annoucements, setAnnoucements] = useState<Annoucements[]>([]);

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
      </CardsContainer>
    </ViewContainer>
  );
};

export default AnnoucementsList;
