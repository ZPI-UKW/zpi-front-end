import { Container } from '@material-ui/core';
import AnnoucementForm from '../../components/Forms/Annocement';
import ViewTitle from '../../components/ViewTitle';
import useStyles from './styles';

const CreateAnnoucements = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <ViewTitle>Dodaj ogłoszenie</ViewTitle>
      <AnnoucementForm />
    </Container>
  );
};

export default CreateAnnoucements;
