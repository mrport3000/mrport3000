import React from 'react';

function QuestionModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="kris-modal">
      <div className="kris-modal-content">
        <div className="kris-modal-header">
          <h4 className="kris-modal-title">Ask Your Question</h4>
          <h5 className="kris-modal-subtitle">{`About the ${props.product}`}</h5>
        </div>
        <div className="kris-modal-body">
          <div className="kris-modal-qQuestion">
            Question:
            <br />
            <input
              className="kris-modal-input-question"
              type="text"
              maxLength="1000"
            />
          </div>
          <div className="kris-modal-qNickname">
            Nickname:
            <br />
            <input
              className="kris-modal-input-nickname"
              type="text"
              maxLength="60"
              placeholder="Example: jackson11!"
            />
          </div>
          <div className="kris-modal-qEmail">
            Email:
            <br />
            <input
              className="kris-modal-input-email"
              type="text"
              maxLength="60"
              placeholder="Why did you like the product or not?”"
            />
          </div>
        </div>
        <div className="kris-modal-footer">
          <button className="navButton" type="button" onClick={props.close}>Close</button>
          <button className="navButton" type="button" onClick={props.submit}>Submit Question</button>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
