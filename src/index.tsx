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

import App from './App';
import { cache, typeDefs } from './cache';
import { LOCAL_STORAGE_PREFIX as PREFIX } from './constants';

import './index.css';

const httpLink = new HttpLink({
  uri: 'http://52.13.54.231:4000/graphql' || 'http://localhost:4000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem(`${PREFIX}tokenId`) || '',
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
  resolvers: {},
  typeDefs,
  link: from([authMiddleware, httpLink]),
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
