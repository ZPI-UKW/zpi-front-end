import { Dialog, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { Formik } from 'formik';
import DialogTitle from '../DialogTitle';
import { useStyles } from './styles';
import { RentDialogProps } from './types';

const RentDialog = ({ isOpen, handleClose }: RentDialogProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          initialValues={{ startData: '', endDate: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, handleChange }) => (
            <DateTimePicker
              className={classes.datePicker}
              value={values.startData}
              onChange={handleChange}
              label="Data odbioru"
              cancelLabel="Anuluj"
              showTodayButton
              todayLabel="Dzisiaj"
            />
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RentDialog;
