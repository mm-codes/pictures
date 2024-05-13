
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Gallery from '../src/components/gallery';
// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, url: 'https://via.placeholder.com/150', title: 'Photo 1' },
        { id: 2, url: 'https://via.placeholder.com/150', title: 'Photo 2' },
      ]),
  })
);
describe('Gallery', () => {
  it('renders images and titles correctly', async () => {
    render(<Gallery />);
    // Wait for images to load
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
    // Check if each image has the correct src and alt attributes
    const images = screen.getAllByRole('img');
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
      expect(image).toHaveAttribute('alt', `Photo ${index + 1}`);
    });
    // Check if each title is rendered correctly
    const titles = screen.getAllByRole('heading');
    titles.forEach((title, index) => {
      expect(title.textContent).toBe(`Photo ${index + 1}`);
    });
  });
});