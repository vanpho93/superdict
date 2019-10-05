import React from 'react';
import { connect } from 'react-redux'
import { Divider, Button } from 'antd'
import { logOut } from '../../redux/actions'

class UserInfoComponent extends React.Component {
  render() {
    const { user, logOut } = this.props
    return (
      <Divider style={{ paddingTop: 200 }}>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <Button type="dashed" onClick={logOut}>Logout</Button>
      </Divider>
    )
  }
}

export const UserInfo = connect(state => ({ user: state.user }), { logOut })(UserInfoComponent)
