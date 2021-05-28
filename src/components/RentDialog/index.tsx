import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import moment from 'moment';
import DatePicker from '../CustomControls/datepicker.control';
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
            startDate: moment(),
            endDate: moment().add(1, 'days'),
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors }) => (
            <Form>
              <Grid container direction="column">
                <Grid item className={classes.pickersWrapper}>
                  <DatePicker name="startDate" />
                  <DatePicker name="endDate" />
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
