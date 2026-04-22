import { useEffect } from 'react';
import { BRAND_NAME, BRAND_SHORT } from '@/constants/brand';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND_SHORT}` : BRAND_NAME;
  }, [title]);
}
