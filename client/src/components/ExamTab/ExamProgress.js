import { defaultTo } from 'lodash'
import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import { submitExam, resetExam } from '../../redux/actions'
import { connect } from 'react-redux'

class ExamProgressComponent extends Component {
  renderVocabulary(vocabulary, isPending) {
    const rightTime = defaultTo(vocabulary.rightTime, 0)
    if (!isPending && rightTime < this.props.repeatTime) return null
    if (isPending && rightTime >= this.props.repeatTime) return null
    const getWord = () => {
      if (isPending) return `${vocabulary.word[0]}...`
      return vocabulary.word
    }
    return <div key={vocabulary.vocabularyId}>
      {getWord()}
      {defaultTo(vocabulary.historyAnswers, []).map((isRight, index) => {
        const type = isRight ? 'check-circle' : 'close-circle'
        const twoToneColor = isRight ? '#52c41a' : '#eb2f96'
        return <Icon key={index} theme="twoTone" type={type} style={{ margin: 6 }} twoToneColor={twoToneColor} />
      })}
    </div>
  }

  render() {
    const { vocabularies, stage, submitExam, resetExam } = this.props
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <div style={{ backgroundColor: '#ffffff', width: '40%' }}>
            <h3>Completed words</h3>
            {vocabularies.map(vocabulary => this.renderVocabulary(vocabulary, false))}
          </div>
          <div style={{ backgroundColor: '#ffffff', width: '40%' }}>
            {stage === 'ANSWERING' ? <h3>Pending words</h3> : null}
            {vocabularies.map(vocabulary => this.renderVocabulary(vocabulary, true))}
          </div>
        </div>
        {stage === 'SHOW_RESULT' ? <div>
          <Button type="primary" style={{ margin: 50 }} size="large" onClick={submitExam}>Submit</Button>
          <Button type="danger" style={{ margin: 50 }} size="large" onClick={resetExam}>Reset</Button>
        </div> : null}
      </div>
    )
  }
}

const mapState = state => ({
  vocabularies: state.EXAM.vocabularies,
  repeatTime: state.EXAM.repeatTime,
  stage: state.EXAM.stage,
})

export const ExamProgress = connect(mapState, { submitExam, resetExam })(ExamProgressComponent)
