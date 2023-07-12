import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import configurei18n from './locale/configurei18n';
import App from './App';

configurei18n();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
