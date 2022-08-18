import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';
// import App from '../App';

describe('Componente Pokedex.js', () => {
  const defaultValue = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  it('Teste se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ defaultValue }
    />);

    const pokedexHeading = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });

    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Testa a funcionalidade dos botões presentes na página', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ defaultValue }
    />);

    const filterPokemons = (filter) => pokemons.filter((pokemon) => {
      if (filter === 'All') return true;
      return pokemon.type === filter;
    });

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();

    const typeButtons = screen.getAllByTestId(/pokemon-type-button/i)
      .reduce((acc, curr) => {
        acc.push(curr.textContent);
        return acc;
      }, ['All']);

    typeButtons.forEach((button) => {
      const currButton = screen.getByRole('button', { name: button });
      expect(currButton).toBeInTheDocument();
      userEvent.click(currButton);

      const pokemonsFiltered = filterPokemons(button);

      pokemonsFiltered.forEach(({ name }) => {
        const currPokemon = screen.getByTestId('pokemon-name');
        expect(currPokemon.textContent).toBe(name);
        userEvent.click(nextPokemonBtn);
      });
    });
  });
});
