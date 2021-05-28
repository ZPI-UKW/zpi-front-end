import { Dialog, DialogContent, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import DatePicker from '../CustomControls/datepicker.control';
import DialogTitle from '../DialogTitle';
import { StyledButton } from '../Forms/styles';
import Pricing from './pricing.rentmodal';
import { useStyles } from './styles';
import { RentDialogProps } from './types';

const RentDialog = ({ isOpen, handleClose, costs }: RentDialogProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

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
            startDate: moment(),
            endDate: moment().add(1, 'days'),
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
            }, 1500);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Grid container direction="column">
                <Grid item className={classes.pickersWrapper}>
                  <DatePicker name="startDate" />
                  <DatePicker name="endDate" />
                </Grid>
                {values.startDate.isAfter(values.endDate) ? (
                  <Alert severity="error" className={classes.alert}>
                    Data oddania musi być większa od daty wypożyczenia
                  </Alert>
                ) : null}
                <Grid item className={classes.contentWrapper}>
                  <Pricing costs={costs} {...values} />
                </Grid>
                <Grid item container justify="center">
                  <StyledButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
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
