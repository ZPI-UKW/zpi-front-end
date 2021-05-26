import { ApolloError } from '@apollo/client';
import { SetContentType } from '../../AuthDialog/types';

export interface QueryData {
  login: {
    userId: string;
    email: string;
    lastname: string;
    name: string;
    phonenumber: string;
    __typename?: string;
  };
}

export interface QueryVars {
  email: string;
  password: string;
}

export interface DataControlProps {
  data: QueryData | undefined;
  error: ApolloError | undefined;
  closeModal: () => void;
}

export interface SignInFormProps {
  setContentType: SetContentType;
  closeModal: () => void;
}
