/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AnswerModal from './AnswerModal.jsx';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);

    const {
      question,
      qid,
      helpful,
      product,
      nicknameChange,
      emailChange,
      id,
    } = this.props;

    this.state = {
      userAnswer: '',
      isAnswering: false,
      question,
      qid,
      helpful,
      product,
      nicknameChange,
      emailChange,
      id,
    };

    this.handleAnswering = this.handleAnswering.bind(this);
    this.handleUserAnswerChange = this.handleUserAnswerChange.bind(this);
  }

  handleAnswering() {
    const { isAnswering } = this.state;
    this.setState({ isAnswering: !isAnswering });
  }

  handleUserAnswerChange(event) {
    this.setState({ userAnswer: event.target.value });
    event.preventDefault();
  }

  render() {
    const {
      userAnswer,
      isAnswering,
      // question,
      qid,
      helpful,
      product,
      nicknameChange,
      emailChange,
      id,
    } = this.state;

    const {
      question,
      nickname,
      email,
      answersChange,
    } = this.props;

    return (
      <div className="kris-QuestionItem">
        <h3 className="kris-QuestionBody">
          Q:
          {question.padStart(question.length + 1, ' ')}
        </h3>
        <div className="kris-qNav">
          <button className="kris-inputButtons" type="button" onClick={() => (axios.get(`/qanda/question/helpful/${qid}`))}>{`Helpful? (${helpful})`}</button>
          <button className="kris-inputButtons" type="button" onClick={() => (axios.get(`/qanda/question/reported/${qid}`))}>Report</button>
          <button
            className="kris-inputButtons"
            type="button"
            onClick={this.handleAnswering}
          >
            add an answer
          </button>
        </div>

        <AnswerModal
          show={isAnswering}
          product={product}
          question={question}
          userAnswer={userAnswer}
          answerChange={this.handleUserAnswerChange}
          nickname={nickname}
          nicknameChange={nicknameChange}
          email={email}
          emailChange={emailChange}
          answersChange={answersChange}
          id={qid}
          index={id}
          close={this.handleAnswering}
        />
      </div>
    );
  }
}

QuestionItem.propTypes = {
  answersChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  qid: PropTypes.number.isRequired,
  helpful: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  nicknameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
};

export default QuestionItem;
