import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useTablet() {
  const isTablet = useMediaQuery({ maxWidth: 1100 });
  const [tabletScreen, setTabletScreen] = useState(false);

  useEffect(() => {
    setTabletScreen(isTablet);
  }, [isTablet]);

  return [tabletScreen];
}
