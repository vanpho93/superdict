import { defaultTo } from 'lodash'
import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'

class ExamProgressComponent extends Component {
  renderVocabulary(vocabulary) {
    return <div key={vocabulary.vocabularyId}>
      {vocabulary.word}
      {defaultTo(vocabulary.historyAnswers, []).map(isRight => {
        const type = isRight ? 'check-circle' : 'close-circle'
        return <Icon type={type} style={{ margin: 3 }} />
      })}
    </div>
  }

  render() {
    const { vocabularies } = this.props
    return (
      <div>
        {vocabularies.map(this.renderVocabulary)}
      </div>
    )
  }
}

const mapState = state => ({
  vocabularies: state.EXAM.vocabularies,
  repeatTime: state.EXAM.repeatTime,
})

export const ExamProgress = connect(mapState, {})(ExamProgressComponent)
