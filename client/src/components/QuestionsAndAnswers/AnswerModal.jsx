import React from 'react';

function AnswerModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="kris-modal">
      <div className="kris-modal-content">
        <div className="kris-modal-header">
          <h4 className="kris-modal-title">Submit Your Answer</h4>
          <h5 className="kris-modal-subtitle">{`About the ${props.product}`}</h5>
        </div>
        <div className="kris-modal-body">
          <div className="kris-modal-qQuestion">
            Question:
            <br />
            <input type="text" maxLength="1000" value="question" />
          </div>
          <div className="kris-modal-qNickname">
            Nickname:
            <br />
            <input type="text" maxLength="60" value="nickname" />
          </div>
          <div className="kris-modal-qEmail">
            Email:
            <br />
            <input type="text" maxLength="60" value="email" />
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

export default AnswerModal;
