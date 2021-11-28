import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { RESERVATION } from '../../graphql/annoucements';
import DatePicker from '../CustomControls/datepicker.control';
import DataControl from '../DataControl';
import DialogTitle from '../DialogTitle';
import SpinnerButton from '../SpinnerButton';
import Pricing from './pricing.rentmodal';
import { useStyles } from './styles';
import { Costs, QueryData, QueryVars, RentDialogProps } from './types';

const RentVariables = (startDate: moment.Moment, endDate: moment.Moment, id: string) => {
  return {
    variables: {
      startAt: moment(startDate).format('YYYY-MM-DD') + 'T00:00:00.000+00:00',
      endAt: moment(endDate).format('YYYY-MM-DD') + 'T00:00:00.000+00:00',
      annoucementId: id,
    },
  };
};

const RentDialog = ({ isOpen, handleClose, costs, id }: RentDialogProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [AddReservation, { data, loading, error }] = useMutation<QueryData, QueryVars>(RESERVATION);

  const [wasCalled, setWasCalled] = useState(false);
  const [step, setStep] = useState(1);

  const renderRentForm = (
    isAfter: boolean,
    isStartBeforeToday: boolean,
    isEndBeforeToday: boolean,
    values: { startDate: Moment; endDate: Moment },
    costs: Costs
  ) => {
    return (
      <>
        <Grid item className={classes.pickersWrapper}>
          <DatePicker name="startDate" />
          <DatePicker name="endDate" />
        </Grid>
        {isAfter && (
          <Alert severity="error" className={classes.alert}>
            Data oddania musi być większa od daty wypożyczenia
          </Alert>
        )}

        {isStartBeforeToday || isEndBeforeToday ? (
          <Alert severity="error" className={classes.alert}>
            Wypożyczenie musi zaczynać się conajmniej dzisiaj
          </Alert>
        ) : null}
        <Grid item className={classes.contentWrapper}>
          <Pricing costs={costs} {...values} />
        </Grid>
      </>
    );
  };

  const renderPaymentForm = () => {
    return (
      <Grid container item direction="column">
        <FormControl component="fieldset">
          <FormLabel component="legend">Rodzaj płatności</FormLabel>
          <RadioGroup value="card">
            <FormControlLabel value="card" control={<Radio />} label="Karta" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Numer karty"
          variant="outlined"
          value="12356432134"
          size="small"
          disabled
          className={classes.textfield}
        />
        <TextField
          label="Data ważności"
          variant="outlined"
          value="09/24"
          size="small"
          disabled
          className={classes.textfield}
        />
        <TextField
          label="CVV"
          variant="outlined"
          value="373"
          size="small"
          disabled
          className={classes.textfield}
        />
      </Grid>
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="rent-dialog-title"
      onExiting={() => setWasCalled(false)}
    >
      <DialogTitle handleClose={handleClose} id="rent-dialog-title">
        {step === 1 ? 'Wybierz termin' : 'Płatność'}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Formik
          initialValues={{
            startDate: moment(),
            endDate: moment().add(1, 'days'),
          }}
          onSubmit={async ({ startDate, endDate }) => {
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
                  {step === 1 &&
                    renderRentForm(isAfter, isStartBeforeToday, isEndBeforeToday, values, costs)}
                  {step === 2 && renderPaymentForm()}
                  <Grid container item justify="center">
                    {step === 1 ? (
                      <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        size="medium"
                        className={classes.button}
                        disabled={Boolean(errors.startDate) || Boolean(errors.endDate) || isAfter}
                        onClick={() => setStep(2)}
                      >
                        Zarezerwuj
                      </Button>
                    ) : (
                      <SpinnerButton
                        type="submit"
                        color="primary"
                        variant="contained"
                        isLoading={loading}
                        className={classes.button}
                        wrapperClassName={classes.buttonWrapper}
                      >
                        Zapłać
                      </SpinnerButton>
                    )}
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
