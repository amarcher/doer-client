import { useEffect } from 'react';
import { APP_NAME } from '../constants';

function getPageTitle(substring?: string) {
  return substring ? `${APP_NAME}: ${substring}` : APP_NAME;
}

export default function usePageTitle(substring?: string) {
  const pageTitle = getPageTitle(substring);

  return useEffect(() => {
    if (typeof window !== 'undefined' && pageTitle) {
      window.document.title = pageTitle;
    }
  }, [pageTitle]);
}
