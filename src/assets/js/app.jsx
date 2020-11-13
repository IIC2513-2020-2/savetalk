import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import RsvpApp from './components/RsvpApp';

const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

const rsvpAppContainer = document.getElementById('rsvp-app');

if (rsvpAppContainer) {
  const data = rsvpAppContainer.dataset;
  ReactDOM.render(<RsvpApp data={data} />, rsvpAppContainer);
}
