import React from 'react';
import ReactDOM from 'react-dom';
import RatingAndReview from './RatingAndReview.jsx';
// const rootElement = document.getElementById('root');

export default class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null,
      width: null,
      comfort: null,
      quality: null,
      length: null,
      fit: null,
      reviewSummary: '',
      reviewBody: '',
      nickname: '',
      email: '',

    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submit was clicked', this.state);
  }

  onChangeValue(e) {
    this.setState({ [e.target.name]: e.target.value }, () => { });
  }

  render() {
    return (
      <div className="eric-RR-modalContainer">
        <div className="eric-RR-modalHeader">
          <h2>
            Write Your Review!
          </h2>
          <h4>
            About the [PRODUCT_NAME]
          </h4>
        </div>
        <div className="eric-RR-modalRating">
          Overall Rating: ☆☆☆☆☆
        </div>
        <div className="eric-RR-recommendProduct">
          <fieldset>
            <legend>
              Do you recommend this product?
            </legend>
            <div>
              <input type="radio" value="yes" name="yes" />
              {' '}
              Yes
              <input type="radio" value="no" name="no" />
              {' '}
              No
            </div>
          </fieldset>
        </div>
        <div className="eric-RR-characteristics">
          <fieldset>
            <legend>
              Characteristics
            </legend>
            <div className="eric-RR-cRating">
              <div className="eric-RR-r0" />
              <div className="eric-RR-r1">1</div>
              <div className="eric-RR-r2">2</div>
              <div className="eric-RR-r3">3</div>
              <div className="eric-RR-r4">4</div>
              <div className="eric-RR-r5">5</div>
            </div>
            <div className="eric-RR-cSize">
              <div className="eric-RR-cTitle"> Size: </div>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="size" />
                {' '}
                A Size Too Small
                <input type="radio" value="2" name="size" />
                {' '}
                1/2 Size Too Small
                <input type="radio" value="3" name="size" />
                {' '}
                Perfect
                <input type="radio" value="4" name="size" />
                {' '}
                1/2 Size Too Big
                <input type="radio" value="5" name="size" />
                {' '}
                A Size Too Big
              </div>
            </div>
            <div className="eric-RR-cWidth">
              <div className="eric-RR-cTitle"> Width: </div>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="width" />
                {' '}
                Too Narrow
                <input type="radio" value="2" name="width" />
                {' '}
                Slightly Narrow
                <input type="radio" value="3" name="width" />
                {' '}
                Perfect
                <input type="radio" value="4" name="width" />
                {' '}
                Slightly Wide
                <input type="radio" value="5" name="width" />
                {' '}
                Too Wide
              </div>
            </div>
            <div className="eric-RR-cComfort">
              <div className="eric-RR-cTitle"> Comfort: </div>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="comfort" />
                {' '}
                Uncomfortable
                <input type="radio" value="2" name="comfort" />
                {' '}
                Slightly Uncomfortable
                <input type="radio" value="3" name="comfort" />
                {' '}
                Ok
                <input type="radio" value="4" name="comfort" />
                {' '}
                Comfortable
                <input type="radio" value="5" name="comfort" />
                {' '}
                Perfect
              </div>
            </div>
            <div className="eric-RR-cQuality">
              <div className="eric-RR-cTitle"> Quality: </div>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="quality" />
                {' '}
                Poor
                <input type="radio" value="2" name="quality" />
                {' '}
                Below Average
                <input type="radio" value="3" name="quality" />
                {' '}
                What I Expected
                <input type="radio" value="4" name="quality" />
                {' '}
                Pretty Great
                <input type="radio" value="5" name="quality" />
                {' '}
                Perfect
              </div>
            </div>
            <div className="eric-RR-cLength">
              <div className="eric-RR-cTitle">Length:</div>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="length" />
                {' '}
                Runs Short
                <input type="radio" value="2" name="length" />
                {' '}
                Runs Slightly Short
                <input type="radio" value="3" name="length" />
                {' '}
                Perfect
                <input type="radio" value="4" name="length" />
                {' '}
                Runs Slightly Long
                <input type="radio" value="5" name="length" />
                {' '}
                Runs Long
              </div>
            </div>
            <div className="eric-RR-cFit">
              <div className="eric-RR-cTitle"> Fit: </div>
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="fit" />
                {' '}
                Runs Tight
                <input type="radio" value="2" name="fit" />
                {' '}
                Runs Slightly Tight
                <input type="radio" value="3" name="fit" />
                {' '}
                Perfect
                <input type="radio" value="4" name="fit" />
                {' '}
                Runs Slightly Long
                <input type="radio" value="5" name="fit" />
                {' '}
                Runs Long
              </div>
            </div>
          </fieldset>
        </div>
        <div className="eric-RR-reviewSummary">
          <form>
            <label>
              Add a review title:
              <input type="text" name="reviewSummary" value={this.state.value} onChange={this.onChangeValue} />
            </label>
          </form>
        </div>
        <div className="eric-RR-reviewBody">
          <form>
            <label>
              Add a written review:
              <input type="text" name="reviewBody" value={this.state.value} onChange={this.onChangeValue} />
            </label>
          </form>
        </div>
        <div className="eric-RR-nickname">
          <form>
            <label>
              Add a nickname:
              <input type="text" name="nickname" value={this.state.value} onChange={this.onChangeValue} />
            </label>
          </form>
        </div>
        <div className="eric-RR-email">
          <form>
            <label>
              Add an email address:
              <input type="text" name="email" value={this.state.value} onChange={this.onChangeValue} />
            </label>
          </form>
        </div>
        <div className="eric-RR-modalSubmit">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="submit" value="Submit" />
            </label>
          </form>

        </div>

      </div>
    );
  }
}

// ReactDOM.render(<RatingAndReview />, rootElement);
