import { render, screen } from '@testing-library/react';
import Landing from '@/components/Landing';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import createMockRouter from '@/utils/testing/MockRouter';

describe('Landing Page', () => {
  describe('Rendering', () => {
    it('should have landing texts', () => {
      render(<Landing />);
      expect(
        screen.getByText(
          'Welcome to a world where your thoughts come alive, accessible anytime, anywhere.'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should go to /auth on click', async () => {
      const pushMock = jest.fn(); // for type error
      const router = createMockRouter({
        pathname: 'auth',
        push: pushMock, // for type error
      });

      render(
        <RouterContext.Provider value={router}>
          <Landing />;
        </RouterContext.Provider>
      );

      await userEvent.click(screen.getByRole('link', { name: 'Get Started' }));
      expect(pushMock.mock.calls[0][0]).toBe('/auth');
    });
  });
});
