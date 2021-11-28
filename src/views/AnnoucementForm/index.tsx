import { useLocation } from 'react-router-dom';
import AnnoucementForm from '../../components/Forms/Annocement';
import ViewContainer from '../../components/ViewContainer';
import ViewTitle from '../../components/ViewTitle';

const CreateAnnoucements = () => {
  const location = useLocation();

  return (
    <ViewContainer>
      <ViewTitle>{location.pathname.startsWith('/edit-advertisement') ? "Edytuj ogłoszenie" : "Dodaj ogłoszenie"}</ViewTitle>
      <AnnoucementForm />
    </ViewContainer>
  );
};

export default CreateAnnoucements;
