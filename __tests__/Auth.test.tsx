import { screen } from '@testing-library/react';
import renderWithProviders from '@/utils/testing/MockRedux';
import Auth from '@/app/(mainlayout)/auth/page';

// this test will give you an error on UserForm component because it is imported from next/navigation, change it to next/router when testing

describe('Auth', () => {
  describe('Rendering', () => {
    it('should render login tab', () => {
      renderWithProviders(<Auth />);

      expect(screen.getByRole('tab', { name: 'Login' })).toBeInTheDocument();
    });
  });
  describe('Behaviour', () => {
    it('should login with the form', () => {});
  });
});
