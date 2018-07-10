import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/fontawesome-free-solid';
import styled, { withTheme } from 'styled-components';
import { darken } from 'polished';

import PageHeader from '../pageHeader';
import data from './data';

/** *
 * STYLED
 */

const FAQRow = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  border-top: solid 1px ${props => darken(0.1, props.theme.colors.quaternary)};
  padding-top: 15px;
  margin: 0 0 15px 0;
  color: ${props => darken(0.2, props.theme.colors.primary)};
  line-height: 25px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0 20px 0 0;
`;

const Question = styled.div`
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  font-size: 1.4em;
`;

const StyledAnswer = styled(ReactMarkdown)`
  font-size: 16px;
  p {
    margin-top: 0;
    line-height: 20px;
  }
`;

/**
 * COMPONENT
 */

const hiddenAnswers = () => {
  const stateObj = {};
  data.forEach((faq) => {
    stateObj[faq.question] = false;
  });
  return stateObj;
};

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = hiddenAnswers();
  }
  toggleQuestion = (question) => {
    const updateObj = {};
    updateObj[question] = !this.state[question];
    this.setState(updateObj);
  };
  render() {
    return (
      <div>
        <PageHeader>Frequently Asked Questions</PageHeader>
        {data.map(faq => (
          <div key={`FAQ-${faq.question}`}>
            <FAQRow onClick={() => this.toggleQuestion(faq.question)}>
              <div>
                <Icon icon={this.state[faq.question] ? faMinus : faPlus} />
              </div>
              <Question>{faq.question}</Question>
            </FAQRow>
            {this.state[faq.question] && <StyledAnswer source={faq.answer} />}
          </div>
        ))}
      </div>
    );
  }
}

export default withTheme(FAQ);
