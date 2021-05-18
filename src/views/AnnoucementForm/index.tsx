import AnnoucementForm from '../../components/Forms/Annocement';
import ViewContainer from '../../components/ViewContainer';
import ViewTitle from '../../components/ViewTitle';

const CreateAnnoucements = () => {
  return (
    <ViewContainer>
      <ViewTitle>Dodaj ogłoszenie</ViewTitle>
      <AnnoucementForm />
    </ViewContainer>
  );
};

export default CreateAnnoucements;
