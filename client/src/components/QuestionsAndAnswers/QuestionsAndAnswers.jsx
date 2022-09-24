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
      isSearching: false,
      list: JSON.parse(JSON.stringify(info)),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAnswersChange = this.handleAnswersChange.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleNickname = this.handleNickname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { query, isSearching } = this.state;
    const list = JSON.parse(JSON.stringify(prevProps.info));

    if (query.length === 0 && isSearching) {
      this.setState({
        list,
        isSearching: false,
      });
    }
  }

  handleClick(key, value) {
    this.setState({ [key]: value });
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
      this.setState({
        list,
        isSearching: true,
      });
    }
  }

  handleAnswersChange(key, answers) {
    const { list } = this.state;
    list.results[key].answers = answers;
    this.setState({ list });
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
        <div className="kris-qanda-Inner">

          <h2 className="kris-qaTitle">QUESTIONS AND ANSWERS</h2>
          <QandASearch search={query} change={this.handleChange} />
          {
            list.results.map((qanda, key) => {
              if (!isExpanded && key >= 2) {
                return (<div />);
              }

              return (
                <div className="kris-qaItem">
                  <QuestionItem
                    question={qanda.question_body}
                    qid={qanda.question_id}
                    helpful={qanda.question_helpfulness}
                    product={product}
                    nickname={nickname}
                    nicknameChange={this.handleNickname}
                    email={email}
                    emailChange={this.handleEmail}
                    answersChange={this.handleAnswersChange}
                    id={key}
                  />
                  <AnswerItem
                    answers={qanda.answers}
                    expanded={isExpanded}
                  />
                </div>
              );
            })
          }
          <QuestionModal
            show={isQuestioning}
            pid={Number(list.product_id)}
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
          />
          <div className="kris-qaFooter">
            <button
              className="navButton"
              type="button"
              // style={{ visibility: (list.length >= 2 ? 'visible' : 'hidden') }}
              onClick={this.handleExpand}
            >
              {(isExpanded ? 'collapse' : 'see all')}
            </button>
            <button className="navButton" type="button" onClick={() => { this.handleClick('isQuestioning', !isQuestioning); }}>ask a question</button>
          </div>
        </div>
      </div>
    );
  }
}

QandA.propTypes = {
  info: PropTypes.object.isRequired,
  product: PropTypes.string.isRequired,
};

export default QandA;
