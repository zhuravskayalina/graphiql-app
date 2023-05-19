import { Response } from '@/pages/api/types';

export interface ResponseProps {
  responseValue: Response | null;
  isLoading: boolean;
}
