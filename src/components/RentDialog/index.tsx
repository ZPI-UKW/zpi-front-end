import { useMutation } from '@apollo/client';
import { Dialog, DialogContent, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { RESERVATION } from '../../graphql/annoucements';
import DatePicker from '../CustomControls/datepicker.control';
import DataControl from '../DataControl';
import DialogTitle from '../DialogTitle';
import SpinnerButton from '../SpinnerButton';
import { RentVariables } from './helpers.rentdialog';
import Pricing from './pricing.rentmodal';
import { useStyles } from './styles';
import { QueryData, QueryVars, RentDialogProps } from './types';

const RentDialog = ({ isOpen, handleClose, costs, id }: RentDialogProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [AddReservation, { data, loading, error }] = useMutation<QueryData, QueryVars>(RESERVATION);

  const [wasCalled, setWasCalled] = useState(false);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="rent-dialog-title"
      onExiting={() => setWasCalled(false)}
    >
      <DialogTitle handleClose={handleClose} id="rent-dialog-title">
        Wybierz termin
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Formik
          initialValues={{
            startDate: moment(),
            endDate: moment().add(1, 'days'),
          }}
          onSubmit={async ({ endDate, startDate }) => {
            try {
              setWasCalled(true);
              await AddReservation(RentVariables(startDate, endDate, id));
            } catch {}
          }}
        >
          {({ values, errors }) => {
            const isAfter = values.startDate.isAfter(values.endDate);
            const isStartBeforeToday = values.startDate.isBefore(moment(), 'day');
            const isEndBeforeToday = values.endDate.isBefore(moment(), 'day');

            return (
              <Form>
                <Grid container direction="column">
                  <Grid item className={classes.pickersWrapper}>
                    <DatePicker name="startDate" />
                    <DatePicker name="endDate" />
                  </Grid>
                  {isAfter ? (
                    <Alert severity="error" className={classes.alert}>
                      Data oddania musi być większa od daty wypożyczenia
                    </Alert>
                  ) : null}
                  {isStartBeforeToday || isEndBeforeToday ? (
                    <Alert severity="error" className={classes.alert}>
                      Wypożyczenie musi zaczynać się conajmniej dzisiaj
                    </Alert>
                  ) : null}
                  <Grid item className={classes.contentWrapper}>
                    <Pricing costs={costs} {...values} />
                  </Grid>
                  <Grid item>
                    <SpinnerButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      isLoading={loading}
                      className={classes.button}
                      wrapperClassName={classes.buttonWrapper}
                      disabled={Boolean(errors.startDate) || Boolean(errors.endDate) || isAfter}
                    >
                      Zarezerwuj
                    </SpinnerButton>
                  </Grid>
                </Grid>
                <DataControl
                  data={data}
                  error={error}
                  loading={loading}
                  called={wasCalled}
                  successMsg="Rezerwacja wykonana pomyślnie."
                  messages={{
                    _409: 'Przedmiot jest zarezerwowany w tym terminie.',
                  }}
                  onSuccess={() => handleClose()}
                />
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RentDialog;
