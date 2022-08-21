import React from 'react';
import QandASearch from './QandASearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import AnswerItem from './AnswerItem.jsx';

const fillerQandA = [
  {
    question: ' What is the meaning of life?',
    answers: [
      '42',
      'to be kind',
      'to not die',
    ],
  },
  {
    question: ' What is the price?',
    answers: [
      '$420.00',
      '$069.00',
      '$741.00',
    ],
  },
];

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedView: false,
    };
  }

  render() {
    const { expandedView } = this.state;
    if (!expandedView) {
      return (
        <div className="kris-qanda">
          <h4>QUESTIONS AND ANSWERS</h4>
          <QandASearch />
          <QuestionItem question={fillerQandA[0].question} />
          <AnswerItem answers={[fillerQandA[0].answers[0]]} />
          <QuestionItem question={fillerQandA[1].question} />
          <AnswerItem answers={[fillerQandA[1].answers[0]]} />
          <button type="button">More Answered Questions</button>
          <button type="button">Add A Question</button>
        </div>
      );
    }

    return (
      <div className="kris-qanda">
        <h4>QUESTIONS AND ANSWERS</h4>
        {
          fillerQandA.map((qanda) => (
            <>
              <QuestionItem question={qanda.question} />
              <AnswerItem answers={qanda.answers} />
            </>
          ))
        }
        <button type="button">More Answered Questions</button>
        <button type="button">Add A Question</button>
      </div>
    );
  }
}

export default QandA;
