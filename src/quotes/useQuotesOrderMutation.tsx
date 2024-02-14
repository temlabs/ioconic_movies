import {MutationFunction, useMutation} from '@tanstack/react-query';
import {queryClient} from '../tanstack/tanstackConfig';
import {Quote} from './quoteTypes';
import {QUOTES} from './useQuotesQuery';

const updateQuotes: MutationFunction<Quote[], Quote[]> = async (
  quotes: Quote[],
) => {
  return quotes;
};

export const ADD_QUOTE = 'addQuote' as const;

export function useQuotesOrderMutation() {
  const mutation = useMutation({
    mutationFn: updateQuotes,
    onMutate: async (quotes: Quote[]) => {
      await queryClient.cancelQueries({queryKey: [QUOTES]});
      const previousQuotes = queryClient.getQueryData([QUOTES]);
      queryClient.setQueryData([QUOTES], quotes);
      return {previousQuotes, quotes};
    },
    onError: (error, variables, context) =>
      context?.previousQuotes &&
      queryClient.setQueryData([QUOTES], context?.previousQuotes),

    mutationKey: [ADD_QUOTE],
  });

  return mutation;
}
