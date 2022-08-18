import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Componente Pokemon.js', () => {
  const defaultPokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    // summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ defaultPokemon }
      isFavorite={ false }
    />);
    const {
      name,
      type,
      averageWeight: { value, measurementUnit },
      image,
    } = defaultPokemon;

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', image);
  });

  it('Testa a existência e a funcionalidade do Link para detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ defaultPokemon }
      isFavorite={ false }
    />);
    const { id } = defaultPokemon;
    const detailsLink = screen.getByRole('link', { name: 'More details' });

    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ defaultPokemon }
      isFavorite
    />);
    const { name } = defaultPokemon;
    const favoriteImg = screen
      .getByRole('img', { name: `${name} is marked as favorite` });
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
