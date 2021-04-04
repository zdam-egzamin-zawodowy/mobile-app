import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

export const createClient = (
  uri: string,
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    queryDeduplication: true,
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (__DEV__) {
          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );
          }
          if (networkError) {
            console.log(`[Network error]: ${networkError}`);
          }
        }
      }),
      new HttpLink({
        uri,
      }),
    ]),
  });
};
