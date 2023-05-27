import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';

export interface Error {
  extensions: Record<string, string>;
  locations: Array<{ line: string; column: string }>;
  message: string;
}

export interface Response {
  data: IntrospectionQuery;
  errors: Array<Error>;
  statusCode: number | null;
}

export interface QueryProps {
  value: string;
  variables: Record<string, unknown>;
  headers: Record<string, unknown>;
}
