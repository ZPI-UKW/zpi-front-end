import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { useStyles } from '../Forms/styles';
import { PasswordInputProps } from './types';

const PasswordField = ({ helperText, error, name, ...props }: PasswordInputProps) => {
  const [isShown, setIsShown] = useState(false);
  const classes = useStyles();

  const toggleVisibility = () => setIsShown((prevState) => !prevState);

  return (
    <FormControl classes={{ root: classes.passwordInput }}>
      <InputLabel htmlFor={name} className={error ? 'Mui-error' : ''}>
        Hasło
      </InputLabel>
      <Input
        id={name}
        className={error ? 'Mui-error' : ''}
        aria-describedby={`${name}-helperText`}
        aria-invalid="true"
        type={isShown ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={toggleVisibility}>
              {isShown ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
      {error ? (
        <FormHelperText id={`${name}-helperText`} className="Mui-error">
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default PasswordField;
