import {MutationFunction, useMutation} from '@tanstack/react-query';
import {queryClient} from '../tanstack/tanstackConfig';
import {Quote} from './quoteTypes';
import {QUOTES} from './useQuotesQuery';

const updateQuotes: MutationFunction<Quote[], Quote[]> = async (
  quotes: Quote[],
) => {
  return quotes;
};

export function useQuotesMutation() {
  const mutation = useMutation({
    mutationFn: updateQuotes,
    onMutate: async (quotes: Quote[]) => {
      await queryClient.cancelQueries({queryKey: [QUOTES]});
      const previousQuotes = queryClient.getQueryData([QUOTES]);
      queryClient.setQueryData([QUOTES], quotes);
      return {previousQuotes, quotes};
    },
    mutationKey: [QUOTES],
  });

  return mutation;
}
