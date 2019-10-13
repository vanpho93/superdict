import { defaultTo } from 'lodash'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox } from 'antd'
import { addVocabulary, removeVocabulary } from '../../redux/actions'
import './VocabularyItem.css'

class VocabularyItemComponent extends Component {
  playAudio = (path) => {
    const url = `https://dictionary.cambridge.org${path}`
    new Audio(url).play()
  }

  toggleInExam = (vocabulary, event) => {
    if (event.target.checked) return this.props.addVocabulary(vocabulary)
    return this.props.removeVocabulary(vocabulary)
  }

  renderHeader() {
    const { vocabulary, mode, vocabularyIds } = this.props
    const getFontSize = () => {
      if (mode === 'large') return 30
      if (mode === 'default') return 20
      return 15
    }
    return (
      <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <b style={{ fontSize: getFontSize(), marginRight: 20 }}> {vocabulary.word}</b> ({vocabulary.type}) <i>{vocabulary.pronunciation}</i>
        </div>
        <Checkbox
          checked={vocabularyIds.includes(vocabulary.vocabularyId)}
          onChange={event => this.toggleInExam(vocabulary, event)}
        >
          Review
        </Checkbox>
      </div>
    )
  }

  renderBody() {
    const { vocabulary, mode } = this.props
    if (mode === 'small') return null
    return <Fragment>
      <span style={{ marginRight: 20 }}>US <Button shape="circle" icon="play-circle" size="small" style={{ borderColor: 'white' }} onClick={() => this.playAudio(vocabulary.americanSound)} /></span>
      <span>UK <Button shape="circle" icon="play-circle" size="small" style={{ borderColor: 'white' }} onClick={() => this.playAudio(vocabulary.americanSound)}/></span>
      <hr />
      <p className="meaning">{vocabulary.meaning}</p>
    </Fragment>
  }

  renderExamples() {
    const { vocabulary, mode } = this.props
    if (mode === 'large') {
      return defaultTo(vocabulary.examples, '').split('|').map((item, index) => <div key={index}><i className="example">{item}</i></div>)
    }
  }

  render() {
    return (
      <div className="VocabularyItem">
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderExamples()}
      </div>
    )
  }
}

const mapState = state => ({
  mode: state.VOCABULARY.mode,
  vocabularyIds: state.EXAM.vocabularyIds,
})

export const VocabularyItem = connect(mapState, { addVocabulary, removeVocabulary })(VocabularyItemComponent)
