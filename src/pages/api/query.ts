import { Response } from './types';

const url = 'https://rickandmortyapi.com/graphql';

export const getQuery = async (
  value: string,
  variables: Record<string, unknown> = {},
  headers: Record<string, unknown> = {}
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ query: value, variables }),
  });
  const { data, errors }: Response = await response.json();
  return { data, errors };
};
