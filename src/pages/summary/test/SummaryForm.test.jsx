import SummaryForm from './../SummaryForm';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

describe('SummaryForm component', () => {
  test('Initial conditions', () => {
    render(<SummaryForm />);

    const termAndConditions = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    });
    // Checkbox is uchecked by default
    expect(termAndConditions).not.toBeChecked();

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    // Submit button is disable by default
    expect(submitButton).toBeDisabled();
  });

  test('Checking checkbox enables button and Unchecking the checkbox again disables button', () => {
    render(<SummaryForm />);

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    const termAndConditions = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    });

    userEvent.click(termAndConditions);
    expect(termAndConditions).toBeChecked();
    expect(submitButton).toBeEnabled();

    userEvent.click(termAndConditions);
    expect(termAndConditions).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });

  test('Popover responds to hover', async () => {
    render(<SummaryForm />);

    // Popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // Popover appears upon mouserover of checkbox
    const termAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // Popover dissapears when we mouse out
    userEvent.unhover(termAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
