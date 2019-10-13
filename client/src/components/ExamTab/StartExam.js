import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, InputNumber } from 'antd'
import {  } from '../../redux/actions'

class StartExamComponent extends Component {
  state = { repeatTime: 3 }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 200, flexDirection: 'column' }}>
        <b>Each word will be repeated for
          <InputNumber
            value={this.state.repeatTime}
            min={1}
            max={10}
            onChange={value => this.setState({ repeatTime: value })}
            style={{ margin: 5 }}
          />
        times</b>
        <Button icon="play-circle" type="primary" style={{ margin: 30 }}>Start Now</Button>
      </div>
    )
  }
}

const mapState = state => ({
  mode: state.VOCABULARY.mode,
  vocabularyIds: state.EXAM.vocabularyIds,
})

export const StartExam = connect(mapState, {  })(StartExamComponent)
