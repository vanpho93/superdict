import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

class ExamTabComponent extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>Vocabulary</Col>
          <Col span={8}></Col>
        </Row>
      </div>
    );
  }
}

export const ExamTab = connect(state => ({ user: state.user }))(ExamTabComponent)
