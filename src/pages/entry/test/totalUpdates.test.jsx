import Options from './../Options';
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
