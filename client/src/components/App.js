import React from 'react';
import { connect } from 'react-redux'
import { Menu, Icon, Spin, Divider, Badge } from 'antd';
import { UserTab } from './UserTab';
import { VocabularyTab } from './VocabularyTab';
import { ExamTab } from './ExamTab';
import { checkToken } from '../redux/actions'
import { ExamStorage } from '../helpers/exam-storage'

class AppComponent extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) return
    // this.props.checkToken()
  }

  state = {
    current: 'vocabulary',
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  getView() {
    if (this.props.isLoading) return <Divider style={{ marginTop: 300 }}><Spin size="large" /></Divider>
    if (this.state.current === 'user') return <UserTab />
    if (this.state.current === 'vocabulary') return <VocabularyTab />
    if (this.state.current === 'exam') return <ExamTab />
  }

  render() {
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="user">
            <Icon type="user" />
            User
          </Menu.Item>
          <Menu.Item key="vocabulary" disabled={!this.props.user}>
            <Icon type="unordered-list" />
            Vocabulary
          </Menu.Item>
          <Menu.Item key="exam" disabled={!this.props.user}>
              <Icon type="play-circle" /> Exam <Badge count={ExamStorage.count()} style={{ backgroundColor: '#52c41a' }} />
          </Menu.Item>
        </Menu>
        {this.getView()}
      </div>
    );
  }
}

export const App = connect(state => ({ isLoading: state.loading.checkToken, user: state.user }), { checkToken })(AppComponent)
