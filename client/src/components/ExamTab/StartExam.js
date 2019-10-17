import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, InputNumber, Radio } from 'antd'
import { startExam } from '../../redux/actions'

class StartExamComponent extends Component {
  state = { repeatTime: 3 }

  render() {
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
        <span style={{ margin: 10 }}>Type:
          <Radio.Group name="radiogroup" defaultValue={1} style={{ margin: 5 }} size="small">
            <Radio.Button value={1}>Meaning</Radio.Button>
            <Radio.Button value={2}>Word</Radio.Button>
          </Radio.Group>
        </span>
        <Button icon="play-circle" type="primary" style={{ margin: 30 }} onClick={() => this.props.startExam(this.state.repeatTime)} size="large">Start Now</Button>
      </div>
    )
  }
}

const mapState = state => ({
  vocabularyIds: state.EXAM.vocabularyIds,
})

export const StartExam = connect(mapState, { startExam })(StartExamComponent)
