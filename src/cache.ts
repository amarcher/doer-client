import { InMemoryCache, makeVar, gql } from '@apollo/client';
import { LOCAL_STORAGE_PREFIX as PREFIX } from './constants';

export const currentUserIdVar = makeVar(
  localStorage.getItem(`${PREFIX}currentUserId`)
);
export const googleProfileObjVar = makeVar(
  localStorage.getItem(`${PREFIX}googleProfileObj`)
);
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
        googleProfileObj: {
          read() {
            return googleProfileObjVar();
          },
        },
        tokenId: {
          read() {
            return tokenIdVar();
          },
        },
      },
    },
    ProjectExecution: {
      fields: {
        posts: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const typeDefs = gql`
  extend type Query {
    currentUserId: String
    googleProfileObj: String
    tokenId: String
  }
`;
