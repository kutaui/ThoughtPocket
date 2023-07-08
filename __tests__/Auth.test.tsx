import { screen } from '@testing-library/react';
import Auth from '@/app/(mainlayout)/auth/page';
import { renderWithProviders } from '@/utils/testing/MockRedux';

describe('Auth', () => {
  describe('Rendering', () => {
    it('should', () => {
      renderWithProviders(<Auth />);
      expect(screen.getByRole('tab', { name: 'Login' })).toBeInTheDocument();
    });
  });
  // describe('Behaviour', () => {});
});
