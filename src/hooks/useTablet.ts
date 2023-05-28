import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useTablet(width: number) {
  const isTablet = useMediaQuery({ maxWidth: width });
  const [tabletScreen, setTabletScreen] = useState(false);

  useEffect(() => {
    setTabletScreen(isTablet);
  }, [isTablet]);

  return [tabletScreen];
}
