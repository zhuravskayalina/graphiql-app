import { Response } from '@/pages/api/types';

export interface ResponseProps {
  responseValue: Response | null;
  isLoading: boolean;
  statusCode: number | null;
}

export type CopyState = {
  text: string;
  color?: string;
  hotKey: boolean;
};
