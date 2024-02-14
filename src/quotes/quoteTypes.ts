import {Character} from '../characters/characterTypes';
import {Movie} from '../movies/movieTypes';

export interface Quote {
  id: string;
  text: string;
  movie: Movie;
  character: Character;
}

export interface ListedQuote extends Quote {
  position?: number;
}
