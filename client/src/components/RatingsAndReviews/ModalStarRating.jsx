import React from 'react';
import { FaStar } from 'react-icons/fa';

class ModalStarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setRating: null,
    };
    this.starClick = this.starClick.bind(this);
  }

  starClick(ratingVal) {
    this.setState({ setRating: ratingVal });
    this.props.liftRating(ratingVal);
  }

  render() {
    const { rating, setRating } = this.state;
    let text;
    if (setRating === 1) {
      text = "-Poor";
    } else if (setRating === 2) {
      text = "-Fair";
    } else if (setRating === 3) {
      text = "-Average";
    } else if (setRating === 4) {
      text = "-Good"
    } else if (setRating === 5) {
      text = "-Great!"
    }

    return (
      <div className="eric-RR-modalStarContainer">
        <div className="eric-RR-modalStarRating">
          {
            [...Array(5)].map((star, i) => {
              const ratingVal = i + 1;

              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingVal}
                    onClick={(ratingVal) => this.starClick(ratingVal.target.value)}
                  />
                  <FaStar
                    className="eric-RR-star"
                    color={ratingVal <= setRating ? '#3C6E71' : '#353535'}
                    size={55}
                  />
                </label>
              );
            })
          }
        </div>
        <div className="eric-RR-modalStarText">
          {text}
        </div>
      </div>
    );
  }
}

export default ModalStarRating;
