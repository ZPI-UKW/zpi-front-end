import { Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { useAuthContextState } from '../../context/authContext';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { StyledButton, StyledTextField, useStyles } from './annoucemets.styles';
import { useEffect, useState } from 'react';
import { annoucements } from '../../data/annoucements';

const initial = {
  title: '',
  location: '',
  phone: '',
  email: '',
  description: '',
  costs: {
    day: 0,
    week: 0,
    month: 0,
  },
};

interface RouteParams {
  addId: string;
}

const AnnoucementForm = () => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState(initial);
  const { userInfo } = useAuthContextState();
  const { pathname } = useLocation();
  const params = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    const user = {
      email: userInfo.email,
      name: userInfo.name,
      phone: userInfo.phonenumber,
    };

    if (pathname === '/create-advertisement') {
      setInitialValues({
        ...initialValues,
        ...user,
      });
    } else {
      const { addId } = params;
      const annoucement = annoucements.find((el) => el._id === addId);

      if (annoucement === undefined) {
        history.push('/');
        return;
      }

      const { title, description, costs, location, email, phone } = annoucement;

      setInitialValues({
        ...user,
        title,
        description,
        costs,
        location,
        email,
        phone,
      });
    }
  }, [pathname, params, history, userInfo]);

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
                <Field
                  label="Nazwa"
                  name="title"
                  as={StyledTextField}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  label="Lokalizacja"
                  name="location"
                  as={StyledTextField}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
                <Field
                  label="Telefon kontaktowy"
                  name="phone"
                  as={StyledTextField}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  label="Email"
                  name="email"
                  as={StyledTextField}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  label="Opis"
                  name="description"
                  multiline
                  rows={4}
                  as={StyledTextField}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <Field
                  label="Cena za 1 dzień"
                  name="costs.day"
                  as={StyledTextField}
                  error={touched.costs?.day && Boolean(errors.costs?.day)}
                  helperText={touched.costs?.day && errors.costs?.day}
                />
                <Field
                  label="Cena za 1 tydzień (7 dni)"
                  name="costs.week"
                  as={StyledTextField}
                  error={touched.costs?.week && Boolean(errors.costs?.week)}
                  helperText={touched.costs?.week && errors.costs?.week}
                />
                <Field
                  label="Cena za 1 miesiąc (30 dni)"
                  name="costs.month"
                  as={StyledTextField}
                  error={touched.costs?.month && Boolean(errors.costs?.month)}
                  helperText={touched.costs?.month && errors.costs?.month}
                />
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
