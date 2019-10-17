import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { answerMeaningVocabulary } from '../../redux/actions'

class ReviewMeaningComponent extends Component {
  state = {
    dragingText: null,
    texts: []
  }

  componentDidMount() {
    const { vocabularies, currentIndex } = this.props
    const { meaning } = vocabularies[currentIndex]
    this.setState({ texts: shuffle(meaning.split(' ')) })
  }

  componentWillReceiveProps(nextProps) {
    const { vocabularies, currentIndex } = nextProps
    const { meaning } = vocabularies[currentIndex]
    this.setState({ texts: shuffle(meaning.split(' ')), dragingText: null })
  }

  onDragStart = (text) => {
    this.setState({ dragingText: text })
  }

  onDragEnd = (dropText) => {
    const { dragingText, texts } = this.state
    this.setState({
      texts: texts.map(text => {
        if (text !== dragingText && text !== dropText) return text
        return text === dragingText ? dropText : dragingText
      }),
      dragingText: null,
    })
  }

  answer = () => {
    this.props.answerMeaningVocabulary(this.state.texts.join(' '))
  }

  render() {
    const { dragingText, texts } = this.state
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 200, marginBottom: 50 }}>
        <div style={{
          backgroundColor: '#EAEAEB', width: '90%', borderRadius: 5, marginBottom: 30, padding: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {texts.map(text => (
            <DragableText
              key={text}
              text={text}
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
              dragingText={dragingText}
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

class DragableText extends Component {
  state = { isDraging: false, isDragOver: false }

  onDragStart = (event) => {
    this.props.onDragStart(this.props.text)
    this.setState({ isDraging: true })
  }

  onDragEnd = (event) => {
    this.setState({ isDraging: false })
  }

  onDrop = (event) => {
    const { text } = this.props
    this.props.onDragEnd(text)
    this.setState({ isDragOver: false })
  }

  onDragEnter = (event) => this.setState({ isDragOver: true })
  onDragLeave = (event) => this.setState({ isDragOver: false })

  render() {
    const { isDraging, isDragOver } = this.state
    const fontWeight = isDraging ? 'lighter' : 'bold'
    const color = isDragOver ? 'red' : 'black'
    return (
      <div
        style={{
          cursor: 'move',
          userSelect: 'none',
          fontWeight,
          margin: 3,
          color,
          backgroundColor: '#FFBF37',
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: 30,
          borderRadius: 10,
        }}
        draggable
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragOver={event => event.preventDefault()}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
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
