import { ApolloError, ServerError, ServerParseError } from '@apollo/client';

export interface CustomApolloError<T = {}> extends Omit<ApolloError, 'networkError'> {
  networkError?: (Error | ServerParseError | ServerError | null) & {
    result?: { errors?: { message?: string; status?: 401 | 403 | 404 | 409 | 422 | 500 }[] };
    data: T;
  };
}
