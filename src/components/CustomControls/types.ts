export interface PasswordInputProps {
  helperText: string | false | undefined;
  error: boolean | undefined;
  name: string;
  label?: string;
}

export interface CustomMaskedInputProps {
  type: string;
  label: string;
  name: string;
  mask?: string;
}

export interface DatePickerProps {
  name: 'startDate' | 'endDate';
  format?: string;
}
