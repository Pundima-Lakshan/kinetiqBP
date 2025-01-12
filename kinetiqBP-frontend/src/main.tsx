import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import '@xyflow/react/dist/style.css';

import '@bpmn-io/form-js/dist/assets/form-js.css';
import '@bpmn-io/form-js/dist/assets/form-js-editor.css';
import '@bpmn-io/form-js/dist/assets/form-js-playground.css';

import { CssBaseline } from '@mui/material';
import { App } from '@/app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
);
