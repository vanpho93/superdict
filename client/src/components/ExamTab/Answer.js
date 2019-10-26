import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import { answerWordVocabulary, skipVocabulary } from '../../redux/actions'

class AnswerComponent extends Component {
  state = { text: '' }

  onSearch = (text) => {
    this.props.answerWordVocabulary(text)
    this.setState({ text: '' })
  }

  render() {
    const { vocabularies, currentIndex } = this.props
    const vocabulary = vocabularies[currentIndex]
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 200, flexDirection: 'column' }}>
        <h3><i>What is the {vocabulary.type} for </i>"{vocabulary.meaning}"</h3>
        <Input.Search
          size="large"
          placeholder="word"
          style={{ margin: 30 }}
          enterButton="Answer"
          value={this.state.text}
          addonBefore={<Button type="link" shape="circle" icon="close-circle" onClick={() => this.props.skipVocabulary(vocabulary.vocabularyId)} />}
          onChange={event => this.setState({ text: event.target.value })}
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

export const Answer = connect(mapState, { answerWordVocabulary, skipVocabulary })(AnswerComponent)
