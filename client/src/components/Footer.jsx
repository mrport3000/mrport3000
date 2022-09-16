import React, { useState } from 'react';
import MalePlugSVG from './IconComponents/MalePlugSVG.jsx';
import FemalePlugSVG from './IconComponents/FemalePlugSVG.jsx'

function Footer({ toggleTheme, theme }) {
  const statement = theme === 'light' ? 'Click Below To Pull The Plug...' : 'Click Below To Turn The Lights Back On...';

  const [fill, setFill] = useState(theme === 'light' ? '#48BF84' : '#F5F5F5');

  const onEnter = () => {
    if (theme === 'light') {
      setFill('#000000');
    } else {
      setFill('#48BF84');
    }
  };

  const onLeave = () => {
    if (theme === 'light') {
      setFill('#48BF84');
    } else {
      setFill('#F5F5F5');
    }
  };

  return (
    <div className="footer-container">
      <h4>{statement}</h4>
      <div
        role="button"
        className="dual-plug-container"
        onClick={toggleTheme}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <MalePlugSVG fill={fill} className="dual-plugs male-plug" />
        <FemalePlugSVG fill={fill} value={{ className: "dual-plugs female-plug" }} />
        {/* <img alt="Male-Plug" src={malePlug} className="dual-plugs male-plug" />
        <img alt="Female-Plug" src={femalePlug} className="dual-plugs female-plug" /> */}
      </div>
    </div>
  );
}

export default Footer;
