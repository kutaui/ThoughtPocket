import Dashboard from '@/app/(dash)/dashboard/page';
import renderWithProviders from '@/utils/testing/MockRedux';

describe('Dashboard', () => {
  describe('Rendering', () => {
    it('should', () => {
      renderWithProviders(<Dashboard />);
    });
  });
  // describe('Behaviour', () => {});
});
