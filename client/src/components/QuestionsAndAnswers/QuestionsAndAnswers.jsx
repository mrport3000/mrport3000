/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import QandASearch from './QandASearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import QuestionModal from './QuestionModal.jsx';
import AnswerItem from './AnswerItem.jsx';

import './QandAStyles.css';

class QandA extends React.Component {
  constructor(props) {
    super(props);

    const {
      info,
    } = this.props;

    this.state = {
      query: '',
      qaQuestion: '',
      nickname: '',
      email: '',
      isExpanded: false,
      isQuestioning: false,
      list: JSON.parse(JSON.stringify(info)),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleNickname = this.handleNickname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('PREV STATE: ', prevState);
  //   console.log('PREV PROPS: ', prevProps);
  // }

  handleClick(key, value) {
    this.setState({ [key]: value });
    console.log('CLICK HANDLED');
  }

  handleExpand() {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  }

  handleChange(event) {
    const { query, list } = this.state;
    this.setState({ query: event.target.value });
    if (query.length > 2) {
      const queriedQuestions = [];
      list.results.forEach((question) => {
        if (question.question_body.includes(query)) {
          queriedQuestions.push(question);
        }
      });

      list.results = queriedQuestions;

      this.setState({ list });
    } else {
      // console.log('ELSE HIT');
      // const { olist } = this.state;
      // console.log('Original Info: ', olist);
      // this.setState(prevState);
    }
  }

  handleQuestion(event) {
    this.setState({ qaQuestion: event.target.value });
  }

  handleNickname(event) {
    this.setState({ nickname: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const {
      isExpanded,
      query,
      qaQuestion,
      nickname,
      email,
      isQuestioning,
      list,
    } = this.state;

    const {
      product,
    } = this.props;

    return (
      <div className="kris-qanda">
        <h4>QUESTIONS AND ANSWERS</h4>
        <QandASearch search={query} change={this.handleChange} />
        {
          list.results.map((qanda, key) => {
            if (!isExpanded && key >= 2) {
              return (<div />);
            }

            return (
              <>
                <QuestionItem
                  question={qanda.question_body}
                  qid={qanda.question_id}
                  helpful={qanda.question_helpfulness}
                  product={product}
                  nickname={nickname}
                  nicknameChange={this.handleNickname}
                  email={email}
                  emailChange={this.handleEmail}
                  id={key}
                />
                <AnswerItem
                  answers={qanda.answers}
                  expanded={isExpanded}
                />
              </>
            );
          })
        }
        <QuestionModal
          show={isQuestioning}
          product={product}
          question={qaQuestion}
          questionChange={this.handleQuestion}
          nickname={nickname}
          nicknameChange={this.handleNickname}
          email={email}
          emailChange={this.handleEmail}
          close={() => {
            this.handleClick('isQuestioning', !isQuestioning);
          }}
          submit={() => {
            this.handleClick('isQuestioning', !isQuestioning);
            console.log(`Q: ${qaQuestion}\nN: ${nickname}\nE: ${email}`);
          }}
        />
        <button className="navButton" type="button" onClick={this.handleExpand}>{(isExpanded ? 'collapse answers' : 'see more answers')}</button>
        <button className="navButton" type="button" onClick={() => { this.handleClick('isQuestioning', !isQuestioning); }}>ask a question</button>
      </div>
    );
  }
}

QandA.propTypes = {
  info: PropTypes.object.isRequired,
  product: PropTypes.string.isRequired,
};

export default QandA;
