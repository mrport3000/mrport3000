import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);

    const {
      product,
      question,
      answerChange,
      nicknameChange,
      emailChange,
      id,
      close,
    } = this.props;

    this.state = {
      product,
      question,
      answerChange,
      nicknameChange,
      emailChange,
      id,
      close,
    };
  }

  render() {
    const {
      product,
      question,
      answerChange,
      nicknameChange,
      emailChange,
      id,
      close,
    } = this.state;

    const {
      show,
      nickname,
      email,
      userAnswer,
      index,
      answersChange,
    } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="kris-modal">
        <div className="kris-modal-content">
          <div className="kris-modal-header">
            <h4 className="kris-modal-title">Submit your answer</h4>
            <h5 className="kris-modal-subtitle">{`${product} : ${question}`}</h5>
          </div>
          <div className="kris-modal-body">
            <div className="kris-modal-aAnswer">
              <p className="kris-p">Your Answer (mandatory)</p>
              <br />
              <textarea
                className="kris-modal-input-question"
                type="text"
                maxLength="1000"
                value={userAnswer}
                onChange={answerChange}
              />
            </div>
            <div className="kris-modal-aNickname">
              <p className="kris-p">What is your nickname (mandatory)</p>
              <br />
              <input
                className="kris-modal-input-nickname"
                type="text"
                maxLength="60"
                placeholder="Example: jackson543!"
                value={nickname}
                onChange={nicknameChange}
              />
              <p className="kris-p-small">For privacy reasons, do not use your full name or email address</p>
            </div>
            <div className="kris-modal-aEmail">
              <p className="kris-p">Your email (mandatory)</p>
              <br />
              <input
                className="kris-modal-input-email"
                type="text"
                maxLength="60"
                placeholder="Example: jack@email.com"
                value={email}
                onChange={emailChange}
              />
              <p className="kris-p-small">For authentication reasons, you will not be emailed</p>
            </div>
          </div>
          <div className="kris-fileUpload">
            {/* <input className="kris-fileUploadButton" type="file" /> */}
            <label className="custom-file-upload">
              <input type="file" />
              Upload Photos
            </label>
          </div>
          <div className="kris-aModalNav">
            <button className="navButton" type="button" onClick={close}>Close</button>
            <button
              className="navButton"
              type="button"
              onClick={() => {
                axios.post(`/qanda/question/${id}/submitanswer`, {
                  body: userAnswer,
                  name: nickname,
                  email,
                  photos: [''],
                }).then(() => {
                  axios.get(`/qanda/answers/${id}`).then((result) => {
                    answersChange(index, result.data.results);
                  }).catch((error) => {
                    console.log(error);
                  });
                }).catch((error) => {
                  console.log(error);
                });
                event.preventDefault();
                close();
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AnswerModal.propTypes = {
  answersChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  userAnswer: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  product: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answerChange: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  nicknameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
};

export default AnswerModal;
