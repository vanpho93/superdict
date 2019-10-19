import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import './ReviewMeaning.css'
import { answerMeaningVocabulary } from '../../redux/actions'

class ReviewMeaningComponent extends Component {
  state = {
    remainTexts: [],
    answeredTexts: [],
  }

  componentDidMount() {
    const { vocabularies, currentIndex } = this.props
    const { meaning } = vocabularies[currentIndex]
    this.setState({ remainTexts: shuffle(meaning.split(' ')) })
  }

  componentWillReceiveProps(nextProps) {
    const { vocabularies, currentIndex } = nextProps
    const { meaning } = vocabularies[currentIndex]
    this.setState({
      remainTexts: shuffle(meaning.split(' ')),
      answeredTexts: [],
    })
  }

  answer = () => {
    this.props.answerMeaningVocabulary(this.state.answeredTexts.join(' '))
  }

  addText = newText => {
    const { remainTexts, answeredTexts } = this.state
    this.setState({
      remainTexts: remainTexts.filter(text => text !== newText),
      answeredTexts: [...answeredTexts, newText]
    })
  }

  removeText = newText => {
    const { remainTexts, answeredTexts } = this.state
    this.setState({
      answeredTexts: answeredTexts.filter(text => text !== newText),
      remainTexts: [...remainTexts, newText]
    })
  }

  render() {
    const { remainTexts, answeredTexts } = this.state
    return (
      <div className="ReviewMeaning">
        <div className="word-box" style={{ backgroundColor: '#00E0A1' }}>
          {answeredTexts.map((text, index) => (
            <BigText
              key={index}
              text={text}
              onClick={() => this.removeText(text)}
            />
          ))}
        </div>
        <div className="word-box" style={{ backgroundColor: '#D4D4D4' }}>
          {remainTexts.map((text, index) => (
            <BigText
              key={index}
              text={text}
              onClick={() => this.addText(text)}
            />
          ))}
        </div>
        <Button type="primary" onClick={this.answer} icon="check" style={{ width: '30%' }}>Check</Button>
      </div>
    );
  }
}

const mapState = state => ({
  vocabularyIds: state.EXAM.vocabularyIds,
  vocabularies: state.EXAM.vocabularies,
  currentIndex: state.EXAM.currentIndex,
})

export const ReviewMeaning = connect(mapState, { answerMeaningVocabulary })(ReviewMeaningComponent)

class BigText extends Component {
  render() {
    return (
      <div className="BigText" onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
