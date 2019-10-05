import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { UserTab } from './UserTab';

const { SubMenu } = Menu;

export class App extends React.Component {
  state = {
    current: 'vocabulary',
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

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
        <UserTab />
      </div>
    );
  }
}
