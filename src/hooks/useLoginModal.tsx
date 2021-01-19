import { useContext } from 'react';
import LoginContext from '../contexts/loginContext';

export default function useLoginModal() {
  return useContext(LoginContext);
}
