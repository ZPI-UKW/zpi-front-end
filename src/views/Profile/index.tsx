import ChangePassword from '../../components/Forms/ChangePassword';
import ChangeUserData from '../../components/Forms/ChangeUserData';
import ViewContainer from '../../components/ViewContainer';
import ViewTitle from '../../components/ViewTitle';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();

  return (
    <ViewContainer>
      <ViewTitle>Edytuj profil</ViewTitle>
      <div className={classes.wrapper}>
        <div className={classes.formContainer}>
          <ChangeUserData />
        </div>
        <div className={classes.formContainer}>
          <ChangePassword />
        </div>
      </div>
    </ViewContainer>
  );
};

export default Profile;
