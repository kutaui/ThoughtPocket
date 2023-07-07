import { render, screen } from '@testing-library/react';
import Landing from '@/components/Landing';

describe('Home Page - Rendering', () => {
  it('should have landing texts', () => {
    render(<Landing />);
    expect(
      screen.getByText(
        'Welcome to a world where your thoughts come alive, accessible anytime, anywhere.'
      )
    ).toBeInTheDocument();
  });

  it("should have 'Get Started' link", () => {
    render(<Landing />);
    expect(
      screen.getByRole('link', { name: 'Get Started' })
    ).toBeInTheDocument();
  });
});
