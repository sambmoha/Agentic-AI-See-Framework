import React from 'react';
import { renderToString } from 'react-dom/server';
import Component from './innodata-ai-framework.jsx';

try {
  const html = renderToString(React.createElement(Component));
  console.log('SSR_OK', html.length);
} catch (e) {
  console.error('SSR_ERR', e?.stack || e);
  process.exit(1);
}
