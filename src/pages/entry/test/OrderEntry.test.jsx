import { rest } from 'msw';
import OrderEntry from './../OrderEntry';
import userEvent from '@testing-library/user-event';
import { server } from './../../../mocks/server';
import {
  render,
  screen,
  waitFor,
} from './../../../test-utils/testing-library-utils';

describe('OrderEntry component', () => {
  test('Handle error for scoops and toopings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });

  test('Disable order button if there are no scoops ordered', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const orderButton = screen.getByRole('button', {
      name: /order sundae!/i,
    });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');
    expect(orderButton).toBeDisabled();
  });
});
