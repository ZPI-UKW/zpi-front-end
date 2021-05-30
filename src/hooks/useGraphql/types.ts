import { ApolloError } from '@apollo/client';

export type OnError = (error: Error, status: number, message: string) => void;

export interface DataControlProps<T> {
  data: T | undefined | null;
  error: ApolloError | undefined;
  loading: boolean;
  called: boolean;
  onError?: OnError;
  onSuccess?: () => void;
  messages?: {
    _401?: string;
    _403?: string;
    _404?: string;
    _409?: string;
    _422?: string;
    _500?: string;
  };
  successMsg?: string;
}
