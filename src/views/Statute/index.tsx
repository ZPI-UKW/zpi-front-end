import { Typography } from '@material-ui/core';
import ViewContainer from '../../components/ViewContainer';
import ViewTitle from '../../components/ViewTitle';
import useStyles from './styles';

const Statute = () => {
  const classes = useStyles();

  return (
    <ViewContainer>
      <ViewTitle>Regulamin serwisu</ViewTitle>
      <Typography variant="body1" className={classes.text}>
        Usługodawca nie ponosi odpowiedzialności za zachowania Użytkowników w ramach aplikacji Rento
        ani za nienależyte wykonanie bądź niewykonanie umów zawartych przez Użytkowników z
        Ogłoszeniodawcami, jak również za następstwa działań podjętych przez Użytkowników oraz osoby
        trzecie, a stanowiących naruszenie postanowień Regulaminu. Usługodawca w szczególności nie
        ponosi odpowiedzialności za prawdziwość i rzetelność informacji podawanych przez
        Użytkowników. Użytkownik ponosi pełną odpowiedzialność za swoje działania związane z
        korzystaniem z Rentoo. Usługodawca dokłada wszelkich starań w celu zabezpieczenia Rento
        przed wystąpieniem jakichkolwiek działań niepożądanych.
      </Typography>
    </ViewContainer>
  );
};

export default Statute;
