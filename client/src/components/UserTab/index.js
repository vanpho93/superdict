import React from 'react';
import { connect } from 'react-redux'
import { UserInfo } from './UserInfo'
import { LogIn } from './LogIn'

class UserTabComponent extends React.Component {
  getView() {
    if (this.props.user) return <UserInfo />
    return <LogIn />
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {this.getView()}
      </div>
    );
  }
}

export const UserTab = connect(state => ({ user: state.user }))(UserTabComponent)
