import {QueryFunction, useQuery} from '@tanstack/react-query';
import demoQuotes from '../demo/quotes';
import {queryClient} from '../tanstack/tanstackConfig';
import {Quote} from './quoteTypes';

export const QUOTES = 'quotes' as const;

const fetchQuotes: QueryFunction<
  Quote[],
  [typeof QUOTES],
  never
> = async () => {
  const quotes = (queryClient.getQueryData([QUOTES]) ?? demoQuotes) as Quote[];
  return quotes;
};

export function useQuotesQuery() {
  const query = useQuery({
    queryKey: [QUOTES],
    queryFn: fetchQuotes,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  return query;
}
