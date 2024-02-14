import {create} from 'zustand';
import {Character} from '../../characters/characterTypes';
import demoCharacters from '../../demo/characters';
import demoMovies from '../../demo/movies';
import {Movie} from '../../movies/movieTypes';
import {Quote} from '../quoteTypes';

export interface AddQuoteStore extends Partial<Quote> {
  setCharacter: (character: Character) => void;
  setMovie: (movie: Movie) => void;
  setText: (text: string) => void;
  reset: () => void;
}

const initial: Partial<AddQuoteStore> = {
  movie: demoMovies[0],
  character: demoCharacters[0],
};

export const useAddQuoteStore = create<AddQuoteStore>(set => ({
  setCharacter: (character: Character) => set({character}),
  setMovie: (movie: Movie) => set({movie}),
  setText: (text: string) => set({text}),
  reset: () => set(initial, true),
  ...initial,
}));
