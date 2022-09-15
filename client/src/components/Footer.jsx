import React from 'react';
import MalePlugBlack from '../../dist/lib/MalePlugBlack.png';
import FemalePlugBlack from '../../dist/lib/FemalePlugBlack.png';
import MalePlugWhite from '../../dist/lib/MalePlugWhite.png';
import FemalePlugWhite from '../../dist/lib/FemalePlugWhite.png';

function Footer({ toggleTheme, theme }) {
  const statement = theme === 'light' ? 'Click Below To Pull The Plug..' : 'Ready To Turn The Lights Back On? Click Below';

  const femalePlug = theme === 'light' ? FemalePlugBlack : FemalePlugWhite;
  const malePlug = theme === 'light' ? MalePlugBlack : MalePlugWhite;

  return (
    <div className="footer-container">
      <h4>{statement}</h4>
      <div role="button" className="dual-plug-container" onClick={toggleTheme}>
        <img alt="Male-Plug" src={malePlug} className="dual-plugs male-plug" />
        <img alt="Female-Plug" src={femalePlug} className="dual-plugs female-plug" />
      </div>
    </div>
  );
}

export default Footer;
