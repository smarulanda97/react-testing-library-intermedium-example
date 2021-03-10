import { render, screen, waitFor } from '@testing-library/react';
import Options from '../Options';

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
});
