import ReactDOM from 'react-dom';
import React from 'react';

// eslint-disable-next-line import/extensions
import App from './components/App.jsx';

const listener = function (e) {
  console.log(e);
};

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
document.body.addEventListener('click', listener, true);
