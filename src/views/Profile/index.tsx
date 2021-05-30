import ViewContainer from '../../components/ViewContainer';
import ViewTitle from '../../components/ViewTitle';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();

  return (
    <ViewContainer>
      <ViewTitle>Edytuj profil</ViewTitle>
      <div className={classes.formContainer}>Update data</div>
      <div className={classes.formContainer}>Change password</div>
    </ViewContainer>
  );
};

export default Profile;
