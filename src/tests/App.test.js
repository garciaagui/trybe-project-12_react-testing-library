import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente App.js', () => {
  it('Testa se o componente contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it('Teste se o link Home redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    // const homeHeading = screen
    //   .queryByRole('heading', { name: 'Encountered pokémons' });

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
    // expect(homeHeading).toBeInTheDocument();
  });

  it('Teste se o link About redireciona para "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Teste se o link Favorite Pokémons redireciona para "Pokémons Favoritados"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Teste a renderização de um caminho inexistente"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/unknown-url');

    const notFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
