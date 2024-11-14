import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { Home } from './pages/home.tsx';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { datePickersCustomizations } from './theme/customizations';
import AppTheme from './theme/app-theme.tsx';

const xThemeComponents = {
  ...datePickersCustomizations,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AppTheme themeComponents={xThemeComponents}>
        <CssBaseline />
        <Home />
      </AppTheme>
    </StyledEngineProvider>
  </StrictMode>,
);
