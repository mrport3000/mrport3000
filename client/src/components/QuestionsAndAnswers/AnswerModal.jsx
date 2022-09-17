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
    } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="kris-modal">
        <div className="kris-modal-content">
          <div className="kris-modal-header">
            <h4 className="kris-modal-title">Submit your answer</h4>
            <h5 className="kris-modal-subtitle">{`${product} : ${question} (id no.${id})`}</h5>
          </div>
          <div className="kris-modal-body">
            <div className="kris-modal-aAnswer">
              Answer:
              <br />
              <input
                className="kris-modal-input-question"
                type="text"
                maxLength="1000"
                value={userAnswer}
                onChange={answerChange}
              />
            </div>
            <div className="kris-modal-aNickname">
              Nickname:
              <br />
              <input
                className="kris-modal-input-nickname"
                type="text"
                maxLength="60"
                placeholder="Example: jackson11!"
                value={nickname}
                onChange={nicknameChange}
              />
            </div>
            <div className="kris-modal-aEmail">
              Email:
              <br />
              <input
                className="kris-modal-input-email"
                type="text"
                maxLength="60"
                placeholder="Why did you like the product or not?”"
                value={email}
                onChange={emailChange}
              />
            </div>
          </div>
          <div className="kris-aModalNav">
            <button className="navButton" type="button" onClick={close}>Close</button>
            <button
              className="navButton"
              type="button"
              onClick={() => {
                console.log(`A: ${userAnswer}\nN: ${nickname}\nE: ${email}`);

                axios.post(`/qanda/question/${id}/submitanswer`, {
                  body: userAnswer,
                  name: nickname,
                  email,
                  photos: [''],
                }).then((response) => {
                  console.log(response);
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
