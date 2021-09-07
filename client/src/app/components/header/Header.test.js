import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.js';

describe('Snapshot testing for Header component', () => {
  test('render Header correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen).toMatchSnapshot();
  });
});
