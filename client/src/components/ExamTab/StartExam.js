import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, InputNumber } from 'antd'
import { startExam } from '../../redux/actions'

class StartExamComponent extends Component {
  state = { repeatTime: 2 }

  render() {
    const { repeatTime } = this.state
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: 200, flexDirection: 'column' }}>
        <span style={{ margin: 10 }}>Repeat time
          <InputNumber
            value={this.state.repeatTime}
            min={1}
            max={10}
            size="small"
            onChange={value => this.setState({ repeatTime: value })}
            style={{ margin: 5 }}
          />
        </span>
        <Button icon="play-circle" type="primary" style={{ margin: 30 }} onClick={() => this.props.startExam(repeatTime)} size="large">
          Start Now
        </Button>
      </div>
    )
  }
}

const mapState = state => ({
  vocabularyIds: state.EXAM.vocabularyIds,
})

export const StartExam = connect(mapState, { startExam })(StartExamComponent)
