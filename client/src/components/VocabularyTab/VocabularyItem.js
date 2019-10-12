import React from 'react'
import { Icon } from 'antd';
import './VocabularyItem.css'

export const VocabularyItem = ({ vocabulary }) => {
  return (
    <div className="VocabularyItem">
      <div style={{ marginBottom: 10 }}><b style={{ fontSize: 30, marginRight: 20 }}> {vocabulary.word}</b> ({vocabulary.type}) {vocabulary.pronunciation}</div>
      <span style={{ marginRight: 20 }}>US <Icon type="play-circle" /></span>
      <span>UK <Icon type="play-circle" /></span>
      <hr />
      <p>{vocabulary.meaning}:</p>
      {vocabulary.examples.split('|').map((item, index) => <div><i key={index} className="example">{item}</i></div>)}
    </div>
  )
}
