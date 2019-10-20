import React from 'react';
import { connect } from 'react-redux'
import { getVocabularies } from '../../redux/actions'
import { VocabularyList } from './VocabularyList'
import { VocabularyFilter } from './VocabularyFilter'
import { simulate } from 'sm2-plus'

class VocabularyTabComponent extends React.Component {
  componentDidMount() {
    this.props.getVocabularies({ pageSize: 10 })
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <VocabularyFilter />
        <VocabularyList />
      </div>
    );
  }
}

export const VocabularyTab = connect(state => ({ user: state.user }), { getVocabularies })(VocabularyTabComponent)

simulate(0.3, 0.1)
