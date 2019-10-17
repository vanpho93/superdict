import { defaultTo } from 'lodash'
import React, { Component, Fragment } from 'react';

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
    const { dragingText, text } = this.props
    this.props.onDragEnd(this.props.text)
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
        style={{ cursor: 'move', userSelect: 'none', fontWeight, margin: 3, color }}
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

export default class Playground extends Component {
  state = {
    dragingText: null,
    texts: ['aaa', 'bbb', 'ccc', 'ddd']
  }

  onDragStart = (text) => {
    this.setState({ dragingText: text })
  }

  onDragEnd = (dropText) => {
    const { dragingText, texts } = this.state
    console.log({
      dropText,
      dragingText,
      texts,
      newTexts: this.state.texts.map(text => {
        if (text !== dragingText && text != dropText) return text
        return text === dragingText ? dropText : dragingText
      })
    })
    this.setState({
      texts: this.state.texts.map(text => {
        if (text !== dragingText && text != dropText) return text
        return text === dragingText ? dropText : dragingText
      }),
      dragingText: null,
    })
  }

  render() {
    const { dragingText, texts } = this.state
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
      </Fragment>
    );
  }
}
