import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/utils/toastUtil';
import { getQuery } from '@/pages/api/query';
import { Response } from '@/pages/api/types';

const useGraphQuery = () => {
  const { t } = useTranslation('common');
  const [requestValue, setRequestValue] = useState<string | undefined>();
  const [variablesValue, setVariablesValue] = useState<string | undefined>();
  const [headersValue, setHeadersValue] = useState<string | undefined>();
  const [responseValue, setResponseValue] = useState<Pick<Response, 'data' | 'errors'> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const setOptions = () => {
    let variables;
    let headers;
    try {
      variables = variablesValue ? JSON.parse(variablesValue) : {};
      headers = headersValue ? JSON.parse(headersValue) : {};
    } catch {
      showToast('error', t('invalidJson'));
    }
    return { variables, headers };
  };

  const onSubmit = async () => {
    setResponseValue(null);
    const query = requestValue ? requestValue : '';
    const { variables, headers } = setOptions();
    setIsLoading(true);
    try {
      const res = await getQuery(query, variables, headers);
      setResponseValue({ data: res.data, errors: res.errors });
      setStatusCode(res.statusCode);
    } catch (error) {
      showToast('error', (error as Error).message);
      setResponseValue(null);
      setStatusCode(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    responseValue,
    headersValue,
    setHeadersValue,
    variablesValue,
    setVariablesValue,
    requestValue,
    setRequestValue,
    onSubmit,
    statusCode,
  };
};

export default useGraphQuery;
