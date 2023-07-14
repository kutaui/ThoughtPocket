import React, { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from '@/redux/slices/authSlice';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import createMockRouter from '@/utils/testing/MockRouter';

import { RootState, type store } from '@/redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
  router?: ReturnType<typeof createMockRouter>; // Add the `router` property
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    // for type error, else it was an empty object ()
    preloadedState = undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store = configureStore({ reducer: { user: authReducer }, preloadedState }),

    router = createMockRouter({}), // Create a mock router by default
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <RouterContext.Provider value={router}>
          {children}
        </RouterContext.Provider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
