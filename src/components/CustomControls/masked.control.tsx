import { CustomMaskedInputProps } from './types';
import InputMask from 'react-input-mask';
import { FormikHandlers, useField } from 'formik';
import { StyledTextField } from '../Forms/styles';

const MaskedInput = ({
  name,
  label,
  mask = '999-999-999',
  type,
  className,
}: CustomMaskedInputProps) => {
  const [field, meta] = useField({ name, type });

  return (
    <InputMask mask={mask} value={field.value} onChange={field.onChange} onBlur={field.onBlur}>
      {({ onChange, ...props }: { onChange: FormikHandlers['handleChange'] }) => (
        <StyledTextField
          {...props}
          {...field}
          id={name}
          label={label}
          onChange={onChange}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          className={className}
        />
      )}
    </InputMask>
  );
};

export default MaskedInput;
