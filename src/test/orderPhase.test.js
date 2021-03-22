import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './../App';

beforeAll(() => {
  render(<App />);
});

test('Order phases for happy path', async () => {
  /**
   * Phase order enrty page
   *
   * 1. Find order button and chek if is disable
   * 2. Add ice cream scoops and toppings
   * 3. Click on button Order sundae
   */
  const orderButton = screen.getByRole('button', { name: /order sundae!/i });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const checkboxHotFudges = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  userEvent.click(checkboxHotFudges);

  // screen.debug();
  expect(orderButton).toBeEnabled();
  userEvent.click(orderButton);

  /**
   * Phase order summary page
   *
   * 1. Check summary information based on order
   * 2. Accept terms and condiotions and click button to confirm order
   */
  const summaryHeading = screen.getByRole('heading', {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument();
  expect(screen.getByText(/2 chocolate/i)).toBeInTheDocument();
  expect(screen.getByText(/1 hot fudge/i)).toBeInTheDocument();

  // Alternatively...
  const optionsItems = screen.getAllByRole('listitem');
  const optionsItemsText = optionsItems.map(
    (optionItem) => optionItem.textContent
  );
  expect(optionsItemsText).toEqual(['1 Vanilla', '2 Chocolate', '1 Hot fudge']);

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.click(termsAndConditions);

  const buttonConfirmOrder = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(buttonConfirmOrder);

  /**
   * Phase order confirmation page
   *
   * 1. Confirm order number on confirmation page
   * 2. Click new order button on confirmation pages
   * 3. Chech that scoops and toppings subtotals have been reset
   */
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you!/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/your oder number is/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
});
