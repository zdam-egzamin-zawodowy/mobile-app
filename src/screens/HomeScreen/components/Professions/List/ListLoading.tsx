import React from 'react';
import { Spinner } from 'native-base';
import { useVariables } from 'libs/native-base';

const ListLoading = () => {
  const variables = useVariables();
  return <Spinner size="large" color={variables.brandPrimary} />;
};

export default ListLoading;
