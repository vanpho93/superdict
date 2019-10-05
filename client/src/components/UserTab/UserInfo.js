import React from 'react';
import { connect } from 'react-redux'
import { Divider, Button } from 'antd'

class UserInfoComponent extends React.Component {
  render() {
    return (
      <Divider style={{ paddingTop: 200 }}>
        <h1>{this.props.user.name}</h1>
        <p>{this.props.user.email}</p>
        <Button type="dashed">Logout</Button>
      </Divider>
    )
  }
}

export const UserInfo = connect(state => ({ user: state.user }))(UserInfoComponent)
