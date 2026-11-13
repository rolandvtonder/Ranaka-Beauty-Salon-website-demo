import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import type {PageKey} from './seo';

export const render = (page: PageKey) =>
  renderToString(
    <StrictMode>
      <App page={page} />
    </StrictMode>,
  );
