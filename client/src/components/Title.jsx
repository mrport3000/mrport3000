import React from 'react';
import plugIcon from '../../dist/lib/Plug-icon.png';

function Title() {
  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <img className="plug-icon" src={plugIcon} alt="plug" />
          <h1>Mr. PORT:3000</h1>
        </div>
        <div className="header-right">
          <h3>Your shortcut to the <span className="highlight">best deals</span> on the web</h3>
        </div>
      </div>
    </header>
  );
}

export default Title;
