import { Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useAuthContextState } from '../../../context/authContext';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { StyledButton, useStyles } from './styles';
import { useEffect, useState } from 'react';
import { Initial, RouteParams } from './types';
import TextFields from './annoucement.textfields';
import { initial, routeType } from './annoucement.util';

const AnnoucementForm = () => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState<Initial>(initial);
  const { userInfo } = useAuthContextState();
  const { pathname } = useLocation();
  const params = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    routeType(pathname, initialValues, params, userInfo, setInitialValues, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, params]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ touched, errors }) => (
        <Form>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={classes.flexWrapper}>
                <TextFields touched={touched} errors={errors} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              zdjęcia
            </Grid>
          </Grid>
          <div className={classes.flexWrapper}>
            <StyledButton type="submit" variant="contained" color="primary">
              Dodaj ogłoszenie
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AnnoucementForm;
