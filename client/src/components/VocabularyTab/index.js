import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { VocabularyList } from './VocabularyList'

class VocabularyTabComponent extends React.Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <VocabularyList />
      </div>
    );
  }
}

export const VocabularyTab = connect(state => ({ user: state.user }))(VocabularyTabComponent)
