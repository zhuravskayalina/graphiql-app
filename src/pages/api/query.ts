import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';

const url = 'https://rickandmortyapi.com/graphql';

export interface Error {
  extensions: Record<string, string>;
  locations: Array<{ line: string; column: string }>;
  message: string;
}

interface Response {
  data: IntrospectionQuery;
  errors: Array<Error>;
}

export const getQuery = async (value: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: value }),
  });
  const { data, errors }: Response = await response.json();
  return { data, errors };
};
