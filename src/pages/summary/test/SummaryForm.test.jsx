import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from './../SummaryForm';

describe('SummaryForm component', () => {
  test('Initial conditions', () => {
    render(<SummaryForm />);

    const termsCheckbox = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    });
    // Checkbox is uchecked by default
    expect(termsCheckbox).not.toBeChecked();

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    // Submit button is disable by default
    expect(submitButton).toBeDisabled();
  });

  test('Checking checkbox enables button and Unchecking the checkbox again disables button', () => {
    render(<SummaryForm />);

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    const termsCheckbox = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    });

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    expect(submitButton).toBeEnabled();

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });
});
