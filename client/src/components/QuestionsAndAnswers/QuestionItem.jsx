import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AnswerModal from './AnswerModal.jsx';

function QuestionItem(props) {
  const { question, qid, helpful } = props;
  console.log(`QUESTION: ${question}`);
  return (
    <div className="kris-QuestionItem">
      <h3>
        Q:
        {question.padStart(question.length + 1, ' ')}
      </h3>
      <button className="kris-questionHelpful" type="button" onClick={() => (axios.get(`/qanda/question/helpful/${qid}`))}>{`Helpful?(${helpful})`}</button>
      <button className="kris-questionReported" type="button" onClick={() => (axios.get(`/qanda/question/reported/${qid}`))}>Report</button>
      <button className="kris-answerSubmitted" type="button" onClick={console.log('answer clicked!')}>add an answer</button>
    </div>

  );
}

QuestionItem.propTypes = {
  question: PropTypes.string.isRequired,
  helpful: PropTypes.number.isRequired,
  qid: PropTypes.number.isRequired,
};

export default QuestionItem;
