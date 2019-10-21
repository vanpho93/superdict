import React from 'react';
import { connect } from 'react-redux'
import { Spin } from 'antd';
import { StartExam } from './StartExam'
import { Answer } from './Answer'
import { ReviewMeaning } from './ReviewMeaning'
import { ExamProgress } from './ExamProgress'

class ExamTabComponent extends React.Component {
  renderBody() {
    const { stage, examType } = this.props
    if (stage === 'STARTING') return <StartExam />
    if (stage === 'LOADING_VOCABULARY') return <Spin size="large" />
    if (stage === 'ANSWERING_WORD') return (
      <div style={{ width: '70%' }}>
        <Answer />
        <ExamProgress />
      </div>
    )
    if (stage === 'ANSWERING_MEANING') return (
      <div style={{ width: '70%' }}>
        <ReviewMeaning />
        <ExamProgress />
      </div>
    )
    return <ExamProgress />
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        {this.renderBody()}
      </div>
    )
  }
}

export const ExamTab = connect(state => ({ stage: state.EXAM.stage, examType: state.EXAM.examType }))(ExamTabComponent)

/*

*/
