import {create} from 'zustand';
import {Quote} from '../quoteTypes';

export interface AddQuoteStore extends Partial<Quote> {}

export function useAddQuoteStore() {
  const initialState: AddQuoteStore = {};

  const store = create(set => ({
    bears: 0,
    increasePopulation: () =>
      set((state: AddQuoteStore) => ({bears: state.bears + 1})),
    reset: () => set(initialState, true),
  }));

  return store;
}
