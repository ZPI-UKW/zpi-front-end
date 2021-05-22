import { ApolloError, ServerError, ServerParseError } from '@apollo/client';

export interface QueryData {
  login: {
    userId?: string;
    email?: string;
    lastname?: string;
    name?: string;
    phonenumber?: string;
  };
}

export interface QueryVars {
  email: string;
  password: string;
}

export interface CustomApolloError extends Omit<ApolloError, 'networkError'> {
  networkError?: (Error | ServerParseError | ServerError | null) & {
    result?: { errors?: { message?: string; status?: number | string }[] };
    data: any;
  };
}

export interface DataControlProps {
  data: QueryData | undefined;
  error: ApolloError | undefined;
}
