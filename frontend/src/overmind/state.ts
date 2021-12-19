import { derived } from 'overmind';
import { State } from './interfaces';

export const state: State = {
  isLoggedIn: false,
  books: [
    {
      id: '1',
      title: 'Animal Farm',
      author: 'George Orwell',
      read: true,
      year: 2011,
    },
    {
      id: '2',
      title: 'Schuld en boete',
      author: ' Fjodor Dostojevski',
      read: true,
      year: 2021,
    },
  ],
  allBooks: derived((state: State) => Object.values(state.books)),
};
