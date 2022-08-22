import React from 'react';
import PropTypes from 'prop-types';

function AnswerItem(props) {
  const { answers } = props;
  return (
    <div className="kris-AnswerItem">
      {
        answers.map((answer) => (
          <>
            <h3>
              A:
              {answer.padStart(answer.length + 1, ' ')}
            </h3>
            <h4>helpful?</h4>
            <h4>Report</h4>
          </>
        ))
      }
    </div>
  );
}

AnswerItem.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerItem;
