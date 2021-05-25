export interface PasswordInputProps {
  helperText: string | false | undefined;
  error: boolean | undefined;
  name: string;
}

export interface CustomMaskedInputProps {
  type: string;
  label: string;
  name: string;
  mask?: string;
}
