import React from 'react';
import { connect } from 'react-redux'
import { Menu, Icon, Spin, Divider } from 'antd';
import { UserTab } from './UserTab';
import { checkToken } from '../redux/actions'

class AppComponent extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) return
    this.props.checkToken()
  }

  state = {
    current: 'vocabulary',
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  getView() {
    if(this.props.isLoading) return <Divider style={{ marginTop: 300 }}><Spin size="large" /></Divider>
    return <UserTab />
  }

  render() {
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="user" disabled>
            <Icon type="user" />
            User
          </Menu.Item>
          <Menu.Item key="vocabulary" disabled>
            <Icon type="unordered-list" />
            Vocabulary
          </Menu.Item>
          <Menu.Item key="exam" disabled>
            <Icon type="play-circle" />
            Exam
          </Menu.Item>
        </Menu>
        {this.getView()}
      </div>
    );
  }
}

export const App = connect(state => ({ isLoading: state.loading.checkToken }), { checkToken })(AppComponent)
