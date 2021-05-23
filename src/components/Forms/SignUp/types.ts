import { ApolloError, ServerError, ServerParseError } from '@apollo/client';
import { SetContentType } from '../../AuthDialog/types';

export interface QueryData {
  createUser: {
    _id?: string;
    email?: string;
    lastname?: string;
    name?: string;
    phonenumber?: string;
  };
}

export interface QueryVars {
  email: string;
  password: string;
  name: string;
  lastname: string;
  phonenumber: string;
}

export interface CustomApolloError extends Omit<ApolloError, 'networkError'> {
  networkError?: (Error | ServerParseError | ServerError | null) & {
    result?: { errors?: { message?: string; status?: number | string }[] };
    data: any;
  };
}

export interface DataControlProps {
  data: QueryData | undefined | null;
  error: ApolloError | undefined;
  handleSuccess: (flag: boolean) => void;
  setContentType: SetContentType;
}

export interface SignUpFormProps {
  setContentType: SetContentType;
}
