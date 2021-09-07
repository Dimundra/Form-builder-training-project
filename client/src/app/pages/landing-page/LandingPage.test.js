import LandingPage from './LandingPage.js';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Snapshot testing for LandingPage component', () => {
  test('renders LandingPage correctly', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen).toMatchSnapshot();
  });
});
