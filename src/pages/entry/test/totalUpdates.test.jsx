import Options from './../Options';
import OrderEntry from './../OrderEntry';
import userEvent from '@testing-library/user-event';
import { render, screen } from './../../../test-utils/testing-library-utils';

test('Update scoop subtotal when scoops change', async () => {
  render(<Options optionType={'scoops'} />);

  // Make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // Update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // Update chocolate scoops to 2 and check subtotal
  const inputChocolate = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  userEvent.clear(inputChocolate);
  userEvent.type(inputChocolate, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('Update topping subtotal when toppings change', async () => {
  render(<Options optionType={'toppings'} />);

  // Make sure total starts out $0.00
  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  // Find and tick one box and check subtotal
  const checkboxCherries = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  userEvent.click(checkboxCherries);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  // Tick another box and check subtotal
  const hotFudgeChekbox = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  userEvent.click(hotFudgeChekbox);
  expect(toppingSubtotal).toHaveTextContent('3.00');

  // Tick one of the boxes off and check subtotal
  userEvent.click(checkboxCherries);
  expect(toppingSubtotal).toHaveTextContent('1.50');
});

// /grand total: \$/i
describe('Grand total', () => {
  test('Grand total update properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const orderTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });

    // Checkt that total starts at $0.00
    expect(orderTotal).toHaveTextContent('0.00');

    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '1');

    expect(orderTotal).toHaveTextContent('2.00');
  });

  test('Grand total update properly if topping is added first', async () => {
    render(<OrderEntry />);

    const orderTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const cherriesTopping = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    userEvent.click(cherriesTopping);

    expect(orderTotal).toHaveTextContent('1.50');
  });

  test('Grand total update properly if item is removed', async () => {
    render(<OrderEntry />);

    const orderTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // Add some scoops and toppings and check total
    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '2');

    const cherriesTopping = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
    userEvent.click(cherriesTopping);
    expect(orderTotal).toHaveTextContent('5.50');

    // Remove scoop and check total
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '1');
    expect(orderTotal).toHaveTextContent('3.50');
  });
});
