import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { format } from 'date-fns';

// const example = {
//   5986889: {
//     id: 5986889,
//     body: 'test',
//     date: '2022-07-21T00:00:00.000Z',
//     answerer_name: 'david',
//     helpfulness: 0,
//     photos: [],
//   },
//   5987205: {
//     id: 5987205,
//     body: 'good stuff',
//     date: '2022-07-24T00:00:00.000Z',
//     answerer_name: 'miras',
//     helpfulness: 0,
//     photos: [],
//   },
// };

function AnswerItem(props) {
  const {
    answers,
    expanded,
  } = props;

  return (
    <div className="kris-AnswerItem">
      {
        Object.keys(answers).map((key, index) => {
          const answer = answers[key];
          if (!expanded && index >= 2) {
            return null;
          }
          return (
            <div className="kris-Answer" id={key}>
              <h4 className="kris-AnswerBody">
                {`A:${answer.body.padStart(answer.body.length + 1, ' ')}\n`}
              </h4>
              <p className="kris-AnswerAuth">
                {`\nby: ${answer.answerer_name}, ${format(new Date(answer.date), 'MM/dd/yyyy')}`}
              </p>
              <button
                className="kris-answerHelpful"
                type="button"
                onClick={() => (axios.get(`/qanda/answer/helpful/${answer.id}`))}>{`Helpful?(${answer.helpfulness})`}</button>
              <button className="kris-answerReported" type="button" onClick={() => (axios.get(`/qanda/answer/reported/${answer.id}`))}>Report</button>
            </div>
          );
        })
      }
    </div>
  );
}

AnswerItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  answers: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default AnswerItem;
