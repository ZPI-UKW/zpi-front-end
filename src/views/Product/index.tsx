import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { RouteParams } from './types';
import { Annoucements, annoucements } from '../../data/annoucements';
import { CircularProgress, Container } from '@material-ui/core';
import Annoucement from '../../components/Annoucement';
import useStyles from './styles';
import clsx from 'clsx';

const Product = () => {
  const classes = useStyles();
  const { adId } = useParams<RouteParams>();
  const history = useHistory();
  const [annoucement, setAnnoucement] = useState<Annoucements | null>(null);

  useEffect(() => {
    const ann = annoucements.find((el) => el._id === adId);
    setTimeout(() => {
      if (ann) setAnnoucement(ann);
      else history.push('/');
    }, 1500);
  }, [adId, history]);

  return (
    <Container className={clsx(classes.root, !annoucement && classes.centered)}>
      {annoucement ? <Annoucement /> : <CircularProgress />}
    </Container>
  );
};

export default Product;
