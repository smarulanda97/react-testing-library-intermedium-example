import { rest } from 'msw';
import {
  render,
  screen,
  waitFor,
} from './../../../test-utils/testing-library-utils';
import { server } from './../../../mocks/server';

import OrderConfirmation from './../OrderConfirmation';

test('Error response from server for submitting order', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderConfirmation setOrderPhase={jest.fn(OrderConfirmation)} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error ocurred. Please try again.'
  );
});
