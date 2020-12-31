import { googleProfileObjVar, tokenIdVar, currentUserIdVar } from '../cache';
import { LOCAL_STORAGE_PREFIX as PREFIX } from '../constants';

export function deauthenticate() {
  localStorage.removeItem(`${PREFIX}currentUserId`);
  localStorage.removeItem(`${PREFIX}tokenId`);
  localStorage.removeItem(`${PREFIX}googleProfileObj`);
  googleProfileObjVar(undefined);
  tokenIdVar(undefined);
  currentUserIdVar(undefined);
}
