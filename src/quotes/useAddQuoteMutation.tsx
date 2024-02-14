import {MutationFunction, useMutation} from '@tanstack/react-query';
import {queryClient} from '../tanstack/tanstackConfig';
import {Quote} from './quoteTypes';
import {QUOTES} from './useQuotesQuery';

const addQuote: MutationFunction<Quote, Quote> = async (quote: Quote) => {
  return quote;
};

export function useAddQuoteMutation() {
  const mutation = useMutation({
    mutationFn: addQuote,
    onMutate: async (quote: Quote) => {
      await queryClient.cancelQueries({queryKey: [QUOTES]});
      const previousQuotes = queryClient.getQueryData([QUOTES]) as Quote[];
      queryClient.setQueryData([QUOTES], [...previousQuotes, quote]);
      return {previousQuotes, quote};
    },
    mutationKey: [QUOTES],
  });

  return mutation;
}
