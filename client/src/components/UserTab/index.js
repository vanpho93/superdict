import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { UserInfo } from './UserInfo'
import { LogIn } from './LogIn'

class UserTabComponent extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <LogIn />
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    );
  }
}

export const UserTab = connect(state => ({ user: state.user }))(UserTabComponent)