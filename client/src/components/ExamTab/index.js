import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { StartExam } from './StartExam'

class ExamTabComponent extends React.Component {
  render() {
    return (
      <div>
        <StartExam />
      </div>
    );
  }
}

export const ExamTab = connect(state => ({ user: state.user }))(ExamTabComponent)
