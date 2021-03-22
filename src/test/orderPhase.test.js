import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './../App';

test('Order phases for happy path', () => {
  // Render app component
  render(<App />);

  // Add ice cream scoops and toppings

  // Find and click order button

  // Check summary information based on order

  // Accept terms and condiotions and click button to confirm order

  // Confirm order number on confirmation page

  // Click new order button on confirmation pages

  // Chech that scoops and toppings subtotals have been reset

  // Do we need to await anythin to avoid test errrors
});
