import React from 'react';
// import RatingAndReview from './RatingAndReview.jsx';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import ModalStarRating from './ModalStarRating.jsx';
import ImageUpload from './ImageUpload.jsx';

export default class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: null,
      recommended: null,
      size: null,
      width: null,
      comfort: null,
      quality: null,
      length: null,
      fit: null,
      reviewSummary: '',
      reviewBody: '',
      imgFiles: [],
      nickname: '',
      email: '',

    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.liftStarRating = this.liftStarRating.bind(this);
    this.uploadPhotoHandler = this.uploadPhotoHandler.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submit was clicked', this.state);
    this.props.closeModal(false);
  }

  onChangeValue(e) {
    this.setState({ [e.target.name]: e.target.value });
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
        this.setState({ imgFiles: imgFiles.concat([fileObj]) });
      });
  }

  render() {
    // console.log('Modal Props: ', this.props.characteristics);
    const { characteristics } = this.props;
    const { imgFiles } = this.state;
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="eric-RR-modal">

        <div className="eric-RR-modalContainer">
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
            <form>

              <fieldset>
                <legend>
                  Do you recommend this product?
                </legend>
                <div>
                  <input type="radio" value="true" name="recommended" onChange={this.onChangeValue} required="required" />
                  {' '}
                  Yes
                  <input type="radio" value="false" name="recommended" onChange={this.onChangeValue} />
                  {' '}
                  No
                </div>
              </fieldset>

            </form>
          </div>
          <div className="eric-RR-characteristics">
            <fieldset>
              <legend>
                Product Characteristics
              </legend>
              {/* <div className="eric-RR-cRating">
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
              </div> */}
              <div>
                {
               Object.keys(characteristics).map((char) => {
                 if (char === 'Size') {
                   return (
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
                   );
                 } if (char === 'Width') {
                   return (
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
                   );
                 } if (char === 'Comfort') {
                   return (
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
                   );
                 } if (char === 'Quality') {
                   return (
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
                   );
                 } if (char === 'Length') {
                   return (
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
                   );
                 } if (char === 'Fit') {
                   return (
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
                   );
                 }

                 // end of map//
               })
              }
              </div>

            </fieldset>
          </div>
          <div className="eric-RR-reviewContainer">
            <div className="eric-RR-reviewSummary">
              <form>
                <label>
                  <p>Add a review title:</p>
                  <input type="text" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!" value={this.state.value} onChange={this.onChangeValue} />
                </label>
              </form>
            </div>
            <div className="eric-RR-reviewBody">
              <form>
                <label>
                  <p>Add a written review:</p>
                  <input type="text" name="reviewBody" maxLength="1000" placeholder="Why did you like the product or not?" value={this.state.value} onChange={this.onChangeValue} />
                </label>
              </form>
            </div>
          </div>
          <div className="eric-RR-uploadPhoto">
            Upload photos:
            <input type="file" onChange={this.uploadPhotoHandler} disabled={imgFiles.length >= 5} />
            <div className="eric-RR-upMap">
              {
                imgFiles.map((file) => <Image cloudName="deitkdfiq" publicId={file.secure_url} />)
                }
            </div>

          </div>
          <div className="eric-RR-nickname">
            <form>
              <label>
                Add a nickname:
                <input type="text" name="nickname" maxLength="60" placeholder="Example: jackson11!" value={this.state.value} onChange={this.onChangeValue} />
              </label>
            </form>
          </div>
          <div className="eric-RR-email">
            <form>
              <label>
                Add an email address:
                <input type="text" name="email" maxLength="60" placeholder="Example: jackson11@email.com" value={this.state.value} onChange={this.onChangeValue} />
              </label>
            </form>
          </div>
          <div className="eric-RR-modalSubmit">
            <form onSubmit={this.handleSubmit}>
              <button type="submit">Submit</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}
