import { defaultTo } from 'lodash'
import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import './VocabularyItem.css'

export class VocabularyItem extends Component {
  playAudio = (path) => {
    const url = `https://dictionary.cambridge.org${path}`
    new Audio(url).play()
  }

  render() {
    const { vocabulary } = this.props
    return (
      <div className="VocabularyItem">
        <div style={{ marginBottom: 10 }}><b style={{ fontSize: 30, marginRight: 20 }}> {vocabulary.word}</b> ({vocabulary.type}) <i>{vocabulary.pronunciation}</i></div>
        <span style={{ marginRight: 20 }}>US <Button shape="circle" icon="play-circle" size="small" style={{ borderColor: 'white' }} onClick={() => this.playAudio(vocabulary.americanSound)} /></span>
        <span>UK <Button shape="circle" icon="play-circle" size="small" style={{ borderColor: 'white' }} onClick={() => this.playAudio(vocabulary.americanSound)}/></span>
        <hr />
        <p>{vocabulary.meaning}:</p>
        {defaultTo(vocabulary.examples, '').split('|').map((item, index) => <div key={index}><i className="example">{item}</i></div>)}
      </div>
    )
  }
}
