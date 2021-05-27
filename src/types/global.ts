import { ApolloError, ServerError, ServerParseError } from '@apollo/client';

export interface CustomApolloError<T = {}> extends Omit<ApolloError, 'networkError'> {
  networkError?: (Error | ServerParseError | ServerError | null) & {
    result?: { errors?: { message?: string; status?: number | string }[] };
    data: T;
  };
}
