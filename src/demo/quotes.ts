import {Quote} from '../quotes/quoteTypes';
import demoCharacters from './characters';
import demoMovies from './movies';

const demoQuotes: Quote[] = [
  {
    id: '1',
    text: 'Hope is a good thing, maybe the best of things, and no good thing ever dies.',
    movie: demoMovies[0],
    character: demoCharacters[0],
  },
  {
    id: '2',
    text: "I'm gonna make him an offer he can't refuse.",
    movie: demoMovies[1],
    character: demoCharacters[1],
  },
  {
    id: '3',
    text: "Life was like a box of chocolates, you never know what you're gonna get.",
    movie: demoMovies[2],
    character: demoCharacters[2],
  },
  {
    id: '4',
    text: 'Why so serious?',
    movie: demoMovies[3],
    character: demoCharacters[3],
  },
  {
    id: '5',
    text: 'No, I am your father.',
    movie: demoMovies[4],
    character: demoCharacters[4],
  },
  {
    id: '6',
    text: "There's a difference between knowing the path and walking the path.",
    movie: demoMovies[5],
    character: demoCharacters[5],
  },
  {
    id: '7',
    text: 'The first rule of Fight Club is: You do not talk about Fight Club.',
    movie: demoMovies[6],
    character: demoCharacters[6],
  },
  {
    id: '8',
    text: 'Life finds a way.',
    movie: demoMovies[7],
    character: demoCharacters[7],
  },
  {
    id: '9',
    text: 'English, motherf*****! Do you speak it?',
    movie: demoMovies[8],
    character: demoCharacters[8],
  },
  {
    id: '10',
    text: "Here's looking at you, kid.",
    movie: demoMovies[9],
    character: demoCharacters[9],
  },
];

export default demoQuotes;
