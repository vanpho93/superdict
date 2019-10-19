import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { answerWordVocabulary } from '../../redux/actions'

class AnswerComponent extends Component {
  onSearch = (text) => {
    this.props.answerWordVocabulary(text)
  }

  render() {
    const { vocabularies, currentIndex } = this.props
    const vocabulary = vocabularies[currentIndex]
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 200, flexDirection: 'column' }}>
        <h3><i>Question: </i>"{vocabulary.meaning}"</h3>
        <Input.Search
          size="large"
          placeholder="word"
          style={{ margin: 30 }}
          enterButton="Answer"
          onSearch={this.onSearch}
        />
      </div>
    )
  }
}

const mapState = state => ({
  vocabularyIds: state.EXAM.vocabularyIds,
  vocabularies: state.EXAM.vocabularies,
  currentIndex: state.EXAM.currentIndex,
})

export const Answer = connect(mapState, { answerWordVocabulary })(AnswerComponent)
