import { render, screen } from '@testing-library/react';
import Auth from '@/app/(mainlayout)/auth/page';

describe('Auth', () => {
  describe('Rendering', () => {
    it('should', () => {
      render(<Auth />);
      expect(screen.getByRole('tab', { name: 'Login' })).toBeInTheDocument();
    });
  });
  // describe('Behaviour', () => {});
});
