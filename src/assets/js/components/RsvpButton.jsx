import React from 'react';
import { hot } from 'react-hot-loader';

function RsvpButton({ disabled, onClick, text }) {
  return(
    <button
      className="btn"
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default hot(module)(RsvpButton);
