import React from 'react';
import PropTypes from 'prop-types';

function AnswerModal(props) {
  const {
    show,
    product,
    question,
    answer,
    answerChange,
    nickname,
    nicknameChange,
    email,
    emailChange,
    id,
    close,
    submit,
  } = props;

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
              value={answer}
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
        <div className="kris-modal-footer">
          <button className="navButton" type="button" onClick={close}>Close</button>
          <button className="navButton" type="button" onClick={submit}>Submit Question</button>
        </div>
      </div>
    </div>
  );
}

AnswerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  product: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  answerChange: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  nicknameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default AnswerModal;
