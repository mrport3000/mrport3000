import React from 'react';

import axios from 'axios';
import { Image } from 'cloudinary-react';
import ModalStarRating from './ModalStarRating.jsx';

export default class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: null,
      recommended: null,
      characteristics: {},
      reviewSummary: '',
      reviewBody: '',
      imgFiles: [],
      nickname: '',
      email: '',

    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onCharChange = this.onCharChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.liftStarRating = this.liftStarRating.bind(this);
    this.uploadPhotoHandler = this.uploadPhotoHandler.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      starRating,
      recommended,
      characteristics,
      reviewSummary,
      reviewBody,
      imgFiles,
      nickname,
      email,
    } = this.state;

    const formattedReview = {
      product_id: this.props.productId,
      rating: Number(starRating),
      recommend: Boolean(recommended),
      summary: reviewSummary,
      body: reviewBody,
      name: nickname,
      email,
      photos: imgFiles,
      characteristics,
    };

    //console.log('formattedReview: ', formattedReview);

    axios.post(`/reviews`, formattedReview)
      .then((response) => {
        console.log('Successfully sent: ', response);
      });
    this.props.closeModal(false);
  }

  onChangeValue(e) {
    // console.log('on change name: ', e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  }

  onCharChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    const { id } = this.props.characteristics[name];
    this.setState((prevState) => ({
      characteristics: {
        ...prevState.characteristics,
        [`${id}`]: Number(value),
      },
    }));
  }

  liftStarRating(rating) {
    this.setState({ starRating: rating });
  }

  uploadPhotoHandler(e) {
    const { imgFiles } = this.state;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'i7xdugiz');

    axios.post('https://api.cloudinary.com/v1_1/deitkdfiq/image/upload', formData)
      .then((response) => {
        // console.log('uploadImage response: ', response.data.secure_url);
        const fileObj = response.data;
        const url = response.data.secure_url;
        this.setState({ imgFiles: imgFiles.concat([url]) });
      });
  }

  render() {
    // console.log('Modal Props: ', this.props);
    const { characteristics } = this.props;
    const { imgFiles } = this.state;
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="eric-RR-modal">

        <div className="eric-RR-modalContainer">
          <span onClick={ () => this.props.closeModal(false) }>X</span>
          <form onSubmit={this.handleSubmit}>
            <div className="eric-RR-modalHeader">
              <h2>
                Add a Review
              </h2>
              <h4>
                About the
                {' '}
                {this.props.productName}
              </h4>
            </div>
            <div className="eric-RR-modalRating">
              <ModalStarRating liftRating={this.liftStarRating} />
            </div>
            <div className="eric-RR-recommendProduct">

              <div>
                Do you recommend this product?
              </div>
              <div>
                <input type="radio" value="true" name="recommended" onChange={this.onChangeValue} required />
                {' '}
                Yes
                <input type="radio" value="false" name="recommended" onChange={this.onChangeValue} />
                {' '}
                No
              </div>

            </div>
            <div className="eric-RR-characteristics">

              <div className="eric-RR-cMainTitle">
                Product Characteristics
              </div>
              <div>
                <div className="eric-RR-cRating">
                  <div className="eric-RR-r0" />
                  <div className="eric-RR-r1">1</div>
                  <div className="eric-RR-r2">2</div>
                  <div className="eric-RR-r3">3</div>
                  <div className="eric-RR-r4">4</div>
                  <div className="eric-RR-r5">5</div>
                </div>
                {
               Object.keys(characteristics).map((char) => {
                 if (char === 'Size') {
                   //  console.log('Size Id: ', this.props.characteristics['Size'].id)
                   return (
                     <div className="eric-RR-cSize">
                       <div className="eric-RR-cTitle"> Size: </div>
                       <div onChange={this.onCharChange}>
                         <input type="radio" value="1" name="Size" required />
                         {' '}
                         A Size Too Small
                         <input type="radio" value="2" name="Size" />
                         {' '}
                         1/2 Size Too Small
                         <input type="radio" value="3" name="Size" />
                         {' '}
                         Perfect
                         <input type="radio" value="4" name="Size" />
                         {' '}
                         1/2 Size Too Big
                         <input type="radio" value="5" name="Size" />
                         {' '}
                         A Size Too Big
                       </div>
                     </div>
                   );
                 } if (char === 'Width') {
                   return (
                     <div className="eric-RR-cWidth">
                       <div className="eric-RR-cTitle"> Width: </div>
                       <div onChange={this.onCharChange}>
                         <input type="radio" value="1" name="Width" required />
                         {' '}
                         Too Narrow
                         <input type="radio" value="2" name="Width" />
                         {' '}
                         Slightly Narrow
                         <input type="radio" value="3" name="Width" />
                         {' '}
                         Perfect
                         <input type="radio" value="4" name="Width" />
                         {' '}
                         Slightly Wide
                         <input type="radio" value="5" name="Width" />
                         {' '}
                         Too Wide
                       </div>
                     </div>
                   );
                 } if (char === 'Comfort') {
                   return (
                     <div className="eric-RR-cComfort">
                       <div className="eric-RR-cTitle"> Comfort: </div>
                       <div onChange={this.onCharChange}>
                         <input type="radio" value="1" name="Comfort" required />
                         {' '}
                         Uncomfortable
                         <input type="radio" value="2" name="Comfort" />
                         {' '}
                         Slightly Uncomfortable
                         <input type="radio" value="3" name="Comfort" />
                         {' '}
                         Ok
                         <input type="radio" value="4" name="Comfort" />
                         {' '}
                         Comfortable
                         <input type="radio" value="5" name="Comfort" />
                         {' '}
                         Perfect
                       </div>
                     </div>
                   );
                 } if (char === 'Quality') {
                   return (
                     <div className="eric-RR-cQuality">
                       <div className="eric-RR-cTitle"> Quality: </div>
                       <div onChange={this.onCharChange}>
                         <input type="radio" value="1" name="Quality" required />
                         {' '}
                         Poor
                         <input type="radio" value="2" name="Quality" />
                         {' '}
                         Below Average
                         <input type="radio" value="3" name="Quality" />
                         {' '}
                         What I Expected
                         <input type="radio" value="4" name="Quality" />
                         {' '}
                         Pretty Great
                         <input type="radio" value="5" name="Quality" />
                         {' '}
                         Perfect
                       </div>
                     </div>
                   );
                 } if (char === 'Length') {
                   return (
                     <div className="eric-RR-cLength">
                       <div className="eric-RR-cTitle">Length:</div>
                       <div onChange={this.onCharChange}>
                         <input type="radio" value="1" name="Length" required />
                         {' '}
                         Runs Short
                         <input type="radio" value="2" name="Length" />
                         {' '}
                         Runs Slightly Short
                         <input type="radio" value="3" name="Length" />
                         {' '}
                         Perfect
                         <input type="radio" value="4" name="Length" />
                         {' '}
                         Runs Slightly Long
                         <input type="radio" value="5" name="Length" />
                         {' '}
                         Runs Long
                       </div>
                     </div>
                   );
                 } if (char === 'Fit') {
                   return (
                     <div className="eric-RR-cFit">
                       <div className="eric-RR-cTitle"> Fit: </div>
                       <div onChange={this.onCharChange}>
                         <input type="radio" value="1" name="Fit" required />
                         {' '}
                         Runs Tight
                         <input type="radio" value="2" name="Fit" />
                         {' '}
                         Runs Slightly Tight
                         <input type="radio" value="3" name="Fit" />
                         {' '}
                         Perfect
                         <input type="radio" value="4" name="Fit" />
                         {' '}
                         Runs Slightly Long
                         <input type="radio" value="5" name="Fit" />
                         {' '}
                         Runs Long
                       </div>
                     </div>
                   );
                 }

                 // end of map//
               })
              }
              </div>

            </div>
            <div className="eric-RR-reviewContainer">
              <div className="eric-RR-reviewSummary">
                <label>
                  <p>Add a review title:</p>
                  <input type="text" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!" value={this.state.value} onChange={this.onChangeValue} />
                </label>
              </div>
              <div className="eric-RR-reviewBody">
                <label>
                  <p>Add a written review:</p>
                  <input type="text" name="reviewBody" maxLength="1000" placeholder="Why did you like the product or not?" value={this.state.value} onChange={this.onChangeValue} required />
                </label>
              </div>
            </div>
            <div className="eric-RR-uploadPhoto">
              Upload photos:
              <input type="file" onChange={this.uploadPhotoHandler} disabled={imgFiles.length >= 5} />
              <div className="eric-RR-upMap">
                {
                imgFiles.map((file) => <Image cloudName="deitkdfiq" publicId={file} />)
                }
              </div>

            </div>
            <div className="eric-RR-nickname">
              <label>
                Add a nickname:
                <input type="text" name="nickname" maxLength="60" placeholder="Example: jackson11!" value={this.state.value} onChange={this.onChangeValue} required />
              </label>
            </div>
            <div className="eric-RR-email">
              <label>
                Add an email address:
                <input type="text" name="email" maxLength="60" placeholder="Example: jackson11@email.com" value={this.state.value} onChange={this.onChangeValue} required />
              </label>
            </div>
            {/* <div className="eric-RR-modalSubmit">
              <button type="button">Submit</button>
            </div> */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
