import React from 'react';

import QandASearch from './QandASearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import AnswerItem from './AnswerItem.jsx';

const fillerQandA = {
  product_id: '71697',
  results: [
    {
      question_id: 641733,
      question_body: 'Why did you like the product or not?',
      question_date: '2022-06-14T00:00:00.000Z',
      asker_name: 'Tyler',
      question_helpfulness: 19,
      reported: false,
      answers: {
        5986889: {
          id: 5986889,
          body: 'test',
          date: '2022-07-21T00:00:00.000Z',
          answerer_name: 'david',
          helpfulness: 0,
          photos: [],
        },
        5987205: {
          id: 5987205,
          body: 'good stuff',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'miras',
          helpfulness: 0,
          photos: [],
        },
        5987206: {
          id: 5987206,
          body: 'luv the product',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'miras',
          helpfulness: 0,
          photos: [],
        },
        5987207: {
          id: 5987207,
          body: 'sdad',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'sda',
          helpfulness: 0,
          photos: [],
        },
        5987208: {
          id: 5987208,
          body: 'good stuff',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'miras',
          helpfulness: 0,
          photos: [],
        },
        5987209: {
          id: 5987209,
          body: 'cheap',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1658695073/ggvwsql0k66n5laoi8tf.jpg',
          ],
        },
        5987210: {
          id: 5987210,
          body: 'loved it',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1658695247/mz71187eorxgrvf8cmku.jpg',
          ],
        },
        5987212: {
          id: 5987212,
          body: 'my answer',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [],
        },
        5987213: {
          id: 5987213,
          body: 'foobar',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'miras',
          helpfulness: 0,
          photos: [],
        },
        5987215: {
          id: 5987215,
          body: 'this is a good product',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'mark zuckerberg',
          helpfulness: 0,
          photos: [],
        },
        5987216: {
          id: 5987216,
          body: 'blah blah',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'blah',
          helpfulness: 0,
          photos: [],
        },
        5987217: {
          id: 5987217,
          body: 'foobar',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [],
        },
        5987221: {
          id: 5987221,
          body: 'didnt like it',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [],
        },
        5987233: {
          id: 5987233,
          body: 'answer',
          date: '2022-07-25T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1658776991/uazbnj5t3qtjhnvsp6vt.avif',
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1658776988/ch7ycnj60fvm5x9fdear.jpg',
          ],
        },
        5987264: {
          id: 5987264,
          body: 'my answer',
          date: '2022-07-26T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1658798816/pomwfemeykhftc7aex6j.png',
          ],
        },
        5987340: {
          id: 5987340,
          body: 'good product',
          date: '2022-07-30T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1659204463/a8jpwwrh6qdhyp65srzu.jpg',
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1659204473/ot7hqusrdkmcy36xdtzk.avif',
          ],
        },
        5987359: {
          id: 5987359,
          body: 'my answer',
          date: '2022-07-30T00:00:00.000Z',
          answerer_name: 'test-user',
          helpfulness: 0,
          photos: [
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1659208032/ye3smgjrj1cwzhg2c1t7.jpg',
            'https://res.cloudinary.com/lexicon-atelier/image/upload/v1659208028/tyntbmqj2gqaelnekim9.png',
          ],
        },
        5987360: {
          id: 5987360,
          body: 'test',
          date: '2022-07-30T00:00:00.000Z',
          answerer_name: 'test',
          helpfulness: 0,
          photos: [],
        },
        5987366: {
          id: 5987366,
          body: 'why pennymac sucks a$$',
          date: '2022-08-01T00:00:00.000Z',
          answerer_name: 'pnmacer',
          helpfulness: 1,
          photos: [],
        },
        5987407: {
          id: 5987407,
          body: 'hello',
          date: '2022-08-20T00:00:00.000Z',
          answerer_name: 'ricky',
          helpfulness: 0,
          photos: [],
        },
        5987408: {
          id: 5987408,
          body: 'answering my own question',
          date: '2022-08-20T00:00:00.000Z',
          answerer_name: 'ricky',
          helpfulness: 0,
          photos: [],
        },
      },
    },
    {
      question_id: 641659,
      question_body: 'Where is it manufactured?',
      question_date: '2022-06-03T00:00:00.000Z',
      asker_name: 'user',
      question_helpfulness: 4,
      reported: false,
      answers: {
        5985912: {
          id: 5985912,
          body: 'China',
          date: '2022-06-03T00:00:00.000Z',
          answerer_name: 'Jack',
          helpfulness: 0,
          photos: [],
        },
        5986021: {
          id: 5986021,
          body: "They say it's made in the USA but the tag say China....",
          date: '2022-06-09T00:00:00.000Z',
          answerer_name: 'peterPan',
          helpfulness: 2,
          photos: [],
        },
        5987223: {
          id: 5987223,
          body: 'test',
          date: '2022-07-24T00:00:00.000Z',
          answerer_name: 'blah',
          helpfulness: 1,
          photos: [],
        },
      },
    },
  ],
};

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

    return (
      <div className="kris-qanda">
        <h4>QUESTIONS AND ANSWERS</h4>
        <QandASearch search={query} change={this.handleChange} />
        {
          fillerQandA.results.map((qanda) => (
            <>
              <QuestionItem question={qanda.question_body} />
              <AnswerItem answers={qanda.answers} expanded={isExpanded} />
            </>
          ))
        }
        <button type="button" onClick={this.handleExpand}>{(isExpanded ? 'show less answers' : 'show more answers')}</button>
        <button type="button">Add A Question</button>
      </div>
    );
  }
}

export default QandA;
