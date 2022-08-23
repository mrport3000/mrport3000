import React from 'react';
import PropTypes from 'prop-types';

function QuestionItem(props) {
  const { question } = props;

  return (
    <div className="kris-QuestionItem">
      <h3>
        Q:
        {question}
      </h3>
      <h4>helpful?</h4>
      <h4>Add Answer</h4>
    </div>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.string.isRequired,
};

export default QuestionItem;
