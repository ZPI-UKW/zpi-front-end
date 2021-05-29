import { Button, CircularProgress } from '@material-ui/core';
import { SpinnerButtonProps } from './types';
import { useStyles } from './styles';
import clsx from 'clsx';

const SpinnerButton = ({
  children,
  isLoading = false,
  disabled = false,
  className,
  ...props
}: SpinnerButtonProps) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonWrapper}>
      <Button
        className={clsx(classes.button, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </Button>
      {isLoading && <CircularProgress size={30} className={classes.buttonProgress} />}
    </div>
  );
};

export default SpinnerButton;
