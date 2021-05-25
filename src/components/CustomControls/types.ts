export interface PasswordInputProps {
  helperText: string | false | undefined;
  error: boolean | undefined;
  id: string;
}

export interface CustomMaskedInputProps {
  type: string;
  label: string;
  name: string;
  mask?: string;
}
