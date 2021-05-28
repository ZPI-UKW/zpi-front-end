import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Form, Formik } from 'formik';
import moment from 'moment';
import DialogTitle from '../DialogTitle';
import { StyledButton } from '../Forms/styles';
import { useStyles } from './styles';
import { RentDialogProps } from './types';

const RentDialog = ({ isOpen, handleClose }: RentDialogProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const format = 'DD-MM-yyyy';

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="rent-dialog-title"
    >
      <DialogTitle handleClose={handleClose} id="rent-dialog-title">
        Wybierz termin
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Formik
          initialValues={{
            startDate: new Date(),
            endDate: moment(moment().format(format), format).add(1, 'days'),
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, setFieldValue, errors, setFieldError }) => (
            <Form>
              <Grid container direction="column">
                <Grid item className={classes.pickersWrapper}>
                  <KeyboardDatePicker
                    name="startDate"
                    value={values.startDate}
                    onChange={(date) => setFieldValue('startDate', date, false)}
                    className={classes.datePicker}
                    helperText={errors.startDate}
                    error={Boolean(errors.startDate)}
                    onError={(error) => {
                      if (error !== errors.startDate) setFieldError('startDate', error as string);
                    }}
                    label="Data wypożyczenia"
                    invalidDateMessage="Błędny format daty"
                    minDateMessage="Podana dana nie powinna być przed dzisiejszą"
                    cancelLabel="Anuluj"
                    disablePast
                    format={format}
                  />

                  <KeyboardDatePicker
                    name="endDate"
                    value={values.endDate}
                    onChange={(date) => setFieldValue('endDate', date, false)}
                    className={classes.datePicker}
                    helperText={errors.endDate}
                    error={Boolean(errors.endDate)}
                    onError={(error) => {
                      if (error !== errors.endDate) setFieldError('endDate', error as string);
                    }}
                    label="Data zwrotu"
                    invalidDateMessage="Błędny format daty"
                    minDateMessage="Podana dana nie powinna być przed dzisiejszą"
                    cancelLabel="Anuluj"
                    disablePast
                    format={format}
                  />
                </Grid>
                <Grid item className={classes.contentWrapper}>
                  <Typography variant="h4" gutterBottom>
                    Podsumowanie
                  </Typography>
                  <Typography variant="h4" component="p">
                    0 x miesiąc (30 dni)
                  </Typography>
                  <Typography variant="h4" component="p">
                    3 x tydzień (7 dni)
                  </Typography>
                  <Typography variant="h4" component="p">
                    3 x dzień
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    Łączny koszt
                  </Typography>
                  <Typography variant="h4" component="p">
                    12 876 zł
                  </Typography>
                </Grid>
                <Grid item container justify="center">
                  <StyledButton variant="contained" color="primary" type="submit">
                    Zarezerwuj
                  </StyledButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RentDialog;
