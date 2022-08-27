import React from 'react';

import QandASearch from './QandASearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import AnswerItem from './AnswerItem.jsx';

import './QandAStyles.css';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isExpanded: false,
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
    this.setState({ query: event.target.value });
  }

  render() {
    const { isExpanded, query } = this.state;
    const { info } = this.props;

    return (
      <div className="kris-qanda">
        <h4>QUESTIONS AND ANSWERS</h4>
        <QandASearch search={query} change={this.handleChange} />
        {
          info.results.map((qanda, key) => {
            if (!isExpanded && key >= 2) {
              return (<div />);
            }

            return (
              <>
                <QuestionItem question={qanda.question_body} />
                <AnswerItem answers={qanda.answers} expanded={isExpanded} />
              </>
            );
          })
        }
        <button className="navButton" type="button" onClick={this.handleExpand}>{(isExpanded ? 'show less' : 'show more')}</button>
        <button className="navButton" type="button">ask a question</button>
      </div>
    );
  }
}

export default QandA;
