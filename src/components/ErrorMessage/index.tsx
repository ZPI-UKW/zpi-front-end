import { Box, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { ErrorMessageProps } from './types';
import useStyles from './styles';

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <ErrorOutlineIcon color="error" className={classes.icon} />
      <Typography className={classes.msg} variant="h2" component="h2" color="error">
        {children}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
