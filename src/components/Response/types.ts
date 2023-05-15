import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import { Error } from '@/pages/api/query';

export interface ResponseProps {
  data: IntrospectionQuery | null;
  errors: Error[] | null;
  isLoading: boolean;
}
