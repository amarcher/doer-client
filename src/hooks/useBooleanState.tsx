import { useState, useCallback } from 'react';

export default function useLoginModal(defaultState: boolean) {
  const [bool, setBool] = useState(defaultState);
  const setTrue = useCallback(() => {
    setBool(true);
  }, []);
  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  return { state: bool, setTrue, setFalse };
}
