import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function QuestionModal(props) {
  const {
    pid,
    show,
    product,
    question,
    questionChange,
    nickname,
    nicknameChange,
    email,
    emailChange,
    close,
  } = props;

  if (!show) {
    return null;
  }

  return (
    <div className="kris-modal">
      <div className="kris-modal-content">
        <div className="kris-modal-header">
          <h4 className="kris-modal-title">Ask Your Question</h4>
          <h5 className="kris-modal-subtitle">{`About the ${product}`}</h5>
        </div>
        <div className="kris-modal-body">
          <div className="kris-modal-qQuestion">
            <p className="kris-p">Your Question (mandatory)</p>
            <br />
            <textarea
              className="kris-modal-input-question"
              type="text"
              maxLength="1000"
              value={question}
              onChange={questionChange}
            />
          </div>
          <div className="kris-modal-qNickname">
            <p className="kris-p">What is your nickname (mandatory)</p>
            <br />
            <input
              className="kris-modal-input-nickname"
              type="text"
              maxLength="60"
              placeholder="Example: jackson11!"
              value={nickname}
              onChange={nicknameChange}
            />
            <p className="kris-p-small">For privacy reasons, do not use your full name or email address.</p>
          </div>
          <div className="kris-modal-qEmail">
            <p className="kris-p">Your email (mandatory)</p>
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
        <div className="kris-modal-footer">
          <button className="navButton" type="button" onClick={close}>Close</button>
          <button
            className="navButton"
            type="button"
            onClick={() => {
              axios.post('/qanda/question/', {
                body: question,
                name: nickname,
                email,
                product_id: pid,
              }).then((response) => {
                console.log(response);
              }).catch((error) => {
                console.log(error);
              });

              event.preventDefault();
              close();
            }}
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}

QuestionModal.propTypes = {
  pid: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  product: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionChange: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  nicknameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default QuestionModal;
