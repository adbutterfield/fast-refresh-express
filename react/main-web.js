import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import App from './App';

loadableReady(() => {
  const root = document.getElementById('react-app');
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root,
  );
});
