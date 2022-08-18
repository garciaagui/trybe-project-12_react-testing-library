import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Componente PokemonDetails.js', () => {
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
    summary: pokemons[0].summary,
  };
  const linkContent = 'More details';

  it('Testa se as informações detalhadas do pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    const { id, name, summary } = defaultPokemon;
    const detailsLink = screen.getByRole('link', { name: linkContent });

    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe(`/pokemons/${id}`);

    const pokemonName = screen.getByRole('heading', { level: 2, name: /Details/i });
    const nonExistentLink = screen.queryByRole('link', { name: linkContent });
    const summaryHeading = screen.getByRole('heading', { level: 2, name: /Summary/i });
    const summaryContent = screen.getByText(summary);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(`${name}`);
    expect(nonExistentLink).not.toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryContent).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name, foundAt } = defaultPokemon;

    const detailsLink = screen.getByRole('link', { name: linkContent });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);

    const pokemonLocations = screen
      .getByRole('heading', { level: 2, name: /Game Locations of/i });
    expect(pokemonLocations).toBeInTheDocument();
    expect(pokemonLocations).toHaveTextContent(`${name}`);

    foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      const locationImg = screen.getAllByRole('img', { name: `${name} location` });
      expect(locationName).toBeInTheDocument();
      expect(locationImg[index]).toBeInTheDocument();
      expect(locationImg[index]).toHaveAttribute('src', map);
    });
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = defaultPokemon;

    const detailsLink = screen.getByRole('link', { name: linkContent });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);

    const favCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheckbox).toBeInTheDocument();

    userEvent.click(favCheckbox);
    const favoriteImg = screen
      .queryByRole('img', { name: `${name} is marked as favorite` });
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favCheckbox);
    expect(favoriteImg).not.toBeInTheDocument();
  });
});
