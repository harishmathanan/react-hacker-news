import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <h1>Hacker News</h1>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
