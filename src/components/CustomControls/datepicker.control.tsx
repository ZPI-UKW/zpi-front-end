import { KeyboardDatePicker } from '@material-ui/pickers';
import { useFormikContext } from 'formik';
import { useStyles } from '../RentDialog/styles';
import { FormikProps } from '../RentDialog/types';
import { DatePickerProps } from './types';

const DatePicker = ({ name, format = 'DD-MM-yyyy' }: DatePickerProps) => {
  const classes = useStyles();
  const { values, errors, setFieldValue, setFieldError } = useFormikContext<FormikProps>();

  return (
    <KeyboardDatePicker
      name="startDate"
      value={values[name]}
      onChange={(date) => setFieldValue(name, date, false)}
      className={classes.datePicker}
      helperText={errors[name]}
      error={Boolean(errors[name])}
      onError={(error) => {
        if (error !== errors[name]) setFieldError(name, error as string);
      }}
      label="Data wypożyczenia"
      invalidDateMessage="Błędny format daty"
      minDateMessage="Podana data nie może być przed dzisiejszą"
      maxDateMessage="Błędna data"
      cancelLabel="Anuluj"
      disablePast
      format={format}
    />
  );
};

export default DatePicker;
