import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Componente FavoritePokemons.js', () => {
  it('Teste se é exibida a mensagem "No favorite pokemon found"', () => {
    const noFavPokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ noFavPokemons } />);

    const noPokemonFound = screen
      .getByText(/No favorite pokemon found/i);

    expect(noPokemonFound).toBeInTheDocument();
  });
  // it('Teste se são exibidos todos os cards de pokémons favoritados', () => {

  // });
});
