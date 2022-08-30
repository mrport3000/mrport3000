import React from 'react';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function Thumbnails({ product, handleThumbnailClick }) {
  const [thumbStart, setThumbStart] = useState(0);
  const [thumbEnd, setThumbEnd] = useState(4);

  const increment = () => {
    setThumbStart(thumbStart + 1);
    setThumbEnd(thumbEnd + 1);
  };

  const decrement = () => {
    setThumbStart(thumbStart - 1);
    setThumbEnd(thumbEnd - 1);
  };

  const thumbnailStorage = [];

  product.styles.forEach((style) => {
    style.photos.forEach((thumbnail) => {
      thumbnailStorage.push(thumbnail.thumbnail_url);
    });
  });

  let thumbnailURLs = thumbnailStorage.slice(thumbStart, thumbEnd);

  return (
    <div className="duke-thumb-carousel-container">
      {thumbStart > 0 && (
      <div>
        <MdArrowBackIos onClick={decrement} />
      </div>
      )}
      {thumbnailURLs.map((url) => (
        <button
          className="duke-thumb-carousel-image"
          type="submit"
          aria-label="Mute volume"
          value={url}
          style={{ backgroundImage: `url(${url})` }}
          onClick={handleThumbnailClick}
        />
      ))}
      {thumbEnd < thumbnailStorage.length && (
      <div>
        <MdArrowForwardIos onClick={increment} />
      </div>
      )}
    </div>
  );
}

export default Thumbnails;
