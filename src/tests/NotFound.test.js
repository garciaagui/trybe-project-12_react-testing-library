import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Componente NotFound.js', () => {
  it('Teste se a página contém um heading com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundHeading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });

    expect(notFoundHeading).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = screen
      .getByRole('img',
        { name: /Pikachu crying because the page requested was not found/i });

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', srcImg);
  });
});
