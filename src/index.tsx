import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

import { ROOT_ELEMENT } from './constants';
import App from './App';
import { cache, tokenIdVar, typeDefs } from './cache';
import { LOCAL_STORAGE_PREFIX as PREFIX, GRAPHQL_ENDPOINT } from './constants';
import { deauthenticate } from './utils/auth';

import './index.css';

const local =
  typeof window !== undefined && window.location.hostname === `localhost`;
const dev = process.env.NODE_ENV === `development`;

const httpLink = new HttpLink({
  uri: local && dev ? GRAPHQL_ENDPOINT.DEV : GRAPHQL_ENDPOINT.PROD,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        if (
          message.includes('Session token does not exist for this user') ||
          message.includes('Token used too late') ||
          message.includes('Wrong number of segments in token')
        ) {
          deauthenticate();

          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: '',
            },
          });

          return forward(operation);
        }
      });

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const retryLink = new RetryLink({
  delay: {
    initial: 100,
    max: 2000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error) => !!error,
  },
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:
        tokenIdVar() || localStorage.getItem(`${PREFIX}tokenId`) || '',
    },
  }));

  return forward(operation);
});

// Set up our apollo-client to point at our server
// this can be local or a remote endpoint
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  headers: {
    authorization: localStorage.getItem(`${PREFIX}tokenId`) || '',
    'client-name': 'Doer [Web]',
    'client-version': '1.0.0',
  },
  typeDefs,
  link: from([authLink, retryLink, errorLink, httpLink]),
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById(ROOT_ELEMENT)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
