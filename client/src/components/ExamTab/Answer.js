import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, InputNumber } from 'antd'
import {  } from '../../redux/actions'

class AnswerComponent extends Component {
  state = { repeatTime: 3 }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 200, flexDirection: 'column' }}>
        Answer
      </div>
    )
  }
}

const mapState = state => ({
  vocabularyIds: state.EXAM.vocabularyIds,
})

export const Answer = connect(mapState, { })(AnswerComponent)
