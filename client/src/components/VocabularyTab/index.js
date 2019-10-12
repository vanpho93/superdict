import React from 'react';
import { connect } from 'react-redux'
import { getVocabularies } from '../../redux/actions'
import { VocabularyList } from './VocabularyList'

class VocabularyTabComponent extends React.Component {
  componentDidMount() {
    this.props.getVocabularies()
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <VocabularyList />
      </div>
    );
  }
}

export const VocabularyTab = connect(state => ({ user: state.user }), { getVocabularies })(VocabularyTabComponent)
