import ReactDOM from 'react-dom';
import React from 'react';

// eslint-disable-next-line import/extensions
import App from './components/App.jsx';

const listener = function (e) {
  //One could add interactions API here...
  console.log(e.path);
};

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
//...Just uncomment this to append to DOM
// document.body.addEventListener('click', listener, true);
