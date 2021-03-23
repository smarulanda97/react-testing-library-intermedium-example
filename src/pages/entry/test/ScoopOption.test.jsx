import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import ScoopOption from './../ScoopOption';

test('Indicate if scoop count is non-int or out of range', () => {
  render(<ScoopOption updateItemCount={jest.fn()} name={''} imagePath={''} />);

  // Expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');

  expect(vanillaInput).toHaveClass('is-invalid');

  // Replace with decimal input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  // Replace with input that's too high
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  // Replace with valid input
  // Note: here we're testing our validation rules (namely that the input )
  // ando not react-bootstrap's response
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
