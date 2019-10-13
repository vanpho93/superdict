import { defaultTo } from 'lodash'
import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'

class ExamProgressComponent extends Component {
  renderVocabulary(vocabulary, isPending) {
    if (!isPending && defaultTo(vocabulary.rightTime, 0) < this.props.repeatTime) return null
    if (isPending && defaultTo(vocabulary.rightTime, 0) >= this.props.repeatTime) return null
    const getWord = () => {
      if (isPending) return `${vocabulary.word[0]}...`
      return vocabulary.word
    }
    return <div key={vocabulary.vocabularyId}>
      {getWord()}
      {defaultTo(vocabulary.historyAnswers, []).map(isRight => {
        const type = isRight ? 'check-circle' : 'close-circle'
        const twoToneColor = isRight ? '#52c41a' : '#eb2f96'
        return <Icon theme="twoTone" type={type} style={{ margin: 6 }} twoToneColor={twoToneColor} />
      })}
    </div>
  }

  renderActions = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 30 }}>
        <Button type="dashed">Restart</Button>
        <Button type="primary">Submit</Button>
        <Button type="danger">Escape</Button>
      </div>
    )
  }

  render() {
    const { vocabularies } = this.props
    return (
      <div>
        <h3>Completed words</h3>
        {vocabularies.map(vocabulary => this.renderVocabulary(vocabulary, false))}
        {this.props.stage === 'ANSWERING' ? <h3>Pending words</h3> : null}
        {vocabularies.map(vocabulary => this.renderVocabulary(vocabulary, true))}
        {this.renderActions()}
      </div>
    )
  }
}

const mapState = state => ({
  vocabularies: state.EXAM.vocabularies,
  repeatTime: state.EXAM.repeatTime,
  stage: state.EXAM.stage,
})

export const ExamProgress = connect(mapState, {})(ExamProgressComponent)
