import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import type {PageKey} from './seo';
import './index.css';

const root = document.getElementById('root')!;
const page = (root.dataset.page ?? 'home') as PageKey;
const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
);

// Built pages arrive pre-rendered (good for SEO) and are hydrated; in dev the slot is empty.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
