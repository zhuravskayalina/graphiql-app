import { useRouter as useNextRouter } from 'next/router';

export function useRouter() {
  const router = useNextRouter();
  const { pathname, query } = router;

  return Object.assign(router, { router, pathname, query });
}
