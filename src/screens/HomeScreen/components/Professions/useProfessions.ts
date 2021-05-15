import { useMemo } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { Query, QueryProfessionsArgs } from 'libs/graphql';
import { QUERY_PROFESSIONS } from './queries';

const useProfessions = () => {
  const { loading, data, refetch, networkStatus, error } = useQuery<
    Pick<Query, 'professions'>,
    QueryProfessionsArgs
  >(QUERY_PROFESSIONS, {
    fetchPolicy: 'cache-and-network',
    variables: { sort: ['name ASC'] },
    notifyOnNetworkStatusChange: true,
  });

  const professions = useMemo(() => {
    return (data?.professions.items ?? []).filter(
      profession => profession.qualifications.length > 0,
    );
  }, [data]);

  return {
    loading: professions.length === 0 && loading,
    refetch,
    professions,
    refetching: networkStatus === NetworkStatus.refetch,
    error,
  };
};

export default useProfessions;
