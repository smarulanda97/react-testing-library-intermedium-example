import Options from '../Options';
import userEvent from '@testing-library/user-event';
import { render, screen } from './../../../test-utils/testing-library-utils';

describe('Options component', () => {
  test('Display image for each scoop option from the server', async () => {
    render(<Options optionType={'scoops'} />);

    // Find images 2 images according to mock
    const scoopImage = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImage).toHaveLength(2);

    // Confirm alt text of images
    const altText = scoopImage.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('Display image for each topping option from the server', async () => {
    render(<Options optionType={'toppings'} />);

    // Find images 2 images according to mock
    const toppingImage = await screen.findAllByRole('img', {
      name: /topping$/i,
    });
    expect(toppingImage).toHaveLength(3);

    // Confirm alt text of images
    const altText = toppingImage.map((element) => element.alt);
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });

  test("Scoop's subtotal doesn't update whenan invalid number is entered", async () => {
    render(<Options optionType={'scoops'} />);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1');
    expect(screen.getByText('Scoops total: $0.00')).toBeInTheDocument();
  });
});
