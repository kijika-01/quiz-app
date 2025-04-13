import { render, screen } from '@testing-library/react';
import App from './App';

test('クイズアプリのタイトルが表示される', () => {
  render(<App />);
  const titleElement = screen.getByText(/Reactクイズアプリ/i);
  expect(titleElement).toBeInTheDocument();
});


