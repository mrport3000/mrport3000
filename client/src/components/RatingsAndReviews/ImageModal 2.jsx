import React from 'react';

function ImageModal(props) {
  const handleClick = (e) => {
    if (e.target.classList.contains('dismiss')) {
      props.handleClick(null);
    }
  };

  return (
    <div className="eric-overlay dismiss" onClick={handleClick}>
      <img src={props.clickedImg} alt="selected image enlarged" />
      <span className="dismiss" onClick={handleClick}>X </span>
    </div>
  );
}

export default ImageModal;
