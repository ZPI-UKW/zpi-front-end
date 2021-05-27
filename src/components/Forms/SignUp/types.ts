import { ApolloError } from '@apollo/client';
import { SetContentType } from '../../AuthDialog/types';

export interface QueryData {
  createUser: {
    _id?: string;
    email?: string;
    lastname?: string;
    name?: string;
    phonenumber?: string;
    __typename?: string;
  };
}

export interface QueryVars {
  email: string;
  password: string;
  name: string;
  lastname: string;
  phonenumber: string;
}

export interface DataControlProps {
  data: QueryData | undefined | null;
  error: ApolloError | undefined;
  setContentType: SetContentType;
}

export interface SignUpFormProps {
  setContentType: SetContentType;
}
