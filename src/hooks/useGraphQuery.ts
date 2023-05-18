import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/utils/toastUtil';
import { getQuery } from '@/pages/api/query';
import { Error } from '@/pages/api/types';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';

const useGraphQuery = () => {
  const { t } = useTranslation('common');
  const [requestValue, setRequestValue] = useState<string | undefined>();
  const [variablesValue, setVariablesValue] = useState<string | undefined>();
  const [headersValue, setHeadersValue] = useState<string | undefined>();
  const [data, setData] = useState<IntrospectionQuery | null>(null);
  const [errors, setErrors] = useState<Error[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = () => {
    setData(null);
    setErrors(null);
    const query = requestValue ? requestValue : '';
    const { variables, headers } = setOptions();
    setIsLoading(true);
    getQuery(query, variables, headers)
      .then((res) => {
        setData(res.data);
        setErrors(res.errors);
      })
      .catch((error: Error) => {
        showToast('error', error.message);
        setData(null);
        setErrors(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    data,
    isLoading,
    errors,
    headersValue,
    setHeadersValue,
    variablesValue,
    setVariablesValue,
    requestValue,
    setRequestValue,
    onSubmit,
  };
};

export default useGraphQuery;
