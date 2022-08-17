import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Componente About.js', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(aboutHeading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen
      .getByText(/This application simulates a Pokédex/i);

    const secondParagraph = screen
      .getByText(/One can filter Pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img', { name: /Pokédex/i });

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', srcImg);
  });
});
