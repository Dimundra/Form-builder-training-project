import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('Testing App component', () => {
  test('renders text properly', () => {
    render(<App />);
    expect(screen.getByText('Form builder app')).toBeInTheDocument();
  });
});
