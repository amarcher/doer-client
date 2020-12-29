import { InMemoryCache, makeVar, gql } from '@apollo/client';
import { LOCAL_STORAGE_PREFIX as PREFIX } from './constants';

export const currentUserIdVar = makeVar(
  localStorage.getItem(`${PREFIX}currentUserId`)
);
export const googleIdVar = makeVar(localStorage.getItem(`${PREFIX}googleId`));
export const tokenIdVar = makeVar(localStorage.getItem(`${PREFIX}tokenId`));

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentUserId: {
          read() {
            return currentUserIdVar();
          },
        },
        googleId: {
          read() {
            return googleIdVar();
          },
        },
        tokenId: {
          read() {
            return tokenIdVar();
          },
        },
      },
    },
  },
});

export const typeDefs = gql`
  extend type Query {
    currentUserId: string
    googleId: string
    tokenId: string
  }
`;
