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

const PasswordField = ({ helperText, error, ...props }: { helperText: string; error: boolean }) => {
  const [isShown, setIsShown] = useState(false);
  const classes = useStyles();

  const toggleVisibility = () => setIsShown((prevState) => !prevState);

  return (
    <FormControl classes={{ root: classes.passwordInput }}>
      <InputLabel htmlFor="password" className={error ? 'Mui-error' : ''}>
        Hasło
      </InputLabel>
      <Input
        id="password"
        className={error ? 'Mui-error' : ''}
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
      {error ? <FormHelperText className="Mui-error">{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default PasswordField;
