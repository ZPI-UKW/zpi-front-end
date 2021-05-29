import { ButtonProps } from '@material-ui/core';

export interface SpinnerButtonProps extends ButtonProps {
  children: string;
  isLoading?: boolean;
  wrapperClassName?: string;
}
