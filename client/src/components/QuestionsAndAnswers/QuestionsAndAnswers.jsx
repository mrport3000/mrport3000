import React from 'react';
import _ from 'lodash';

import QandASearch from './QandASearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import QuestionModal from './QuestionModal.jsx';
import AnswerItem from './AnswerItem.jsx';

import './QandAStyles.css';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isExpanded: false,
      isQuestioning: false,
      list: { ...this.props.info },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const originalQuestions = list.results;
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
      // const { info } = this.props;
      // console.log('Original Info: ', info);
      // this.setState({ list: originalQuestions });
    }
  }

  render() {
    const {
      isExpanded, query, isQuestioning, list,
    } = this.state;
    const { info, product } = this.props;
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
                    id={key}
                  />
                  <AnswerItem answers={qanda.answers} expanded={isExpanded} id={key} />
                </>
              );
            })
          }
        <QuestionModal
          show={isQuestioning}
          product={product}
          close={() => { this.handleClick('isQuestioning', !isQuestioning); }}
          submit={() => { console.log('submit was clicked'); }}
        />
        <button className="navButton" type="button" onClick={this.handleExpand}>{(isExpanded ? 'collapse answers' : 'see more answers')}</button>
        <button className="navButton" type="button" onClick={() => { this.handleClick('isQuestioning', !isQuestioning); }}>ask a question</button>
      </div>
    );
  }
}

export default QandA;
