import React from 'react';
import PropTypes from 'prop-types';

function QuestionItem(props) {
  const { question } = props;

  return (
    <div className="kris-QuestionItem">
      <h3>
        Q:
        {question.padStart(question.length + 1, ' ')}
      </h3>
    </div>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.string.isRequired,
};

export default QuestionItem;
