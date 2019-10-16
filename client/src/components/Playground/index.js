import { defaultTo } from 'lodash'
import React, { Component, Fragment } from 'react';

class DragableText extends Component {
  state = { isDraging: false, isDragOver: false }

  onDragStart = (event) => {
    this.props.onDragStart(this.props.text)
    this.setState({ isDraging: true })
  }

  onDragEnd = (event) => {
    this.props.onDragEnd()
    this.setState({ isDraging: false })
  }

  onDrop = (event) => {
    const { dragingText, text } = this.props
    console.log({ dragingText, text })
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
    dragingText: null
  }

  onDragStart = (text) => {
    this.setState({ dragingText: text })
  }

  onDragEnd = (text) => {
    this.setState({ dragingText: null })
  }

  render() {
    const { dragingText } = this.state
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <DragableText text="aaa" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} dragingText={dragingText} />
          <DragableText text="bbb" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} dragingText={dragingText} />
          <DragableText text="ccc" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} dragingText={dragingText} />
          <DragableText text="ddd" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} dragingText={dragingText} />
        </div>
        <p>{defaultTo(this.state.dragingText, 'not draging')}</p>
      </Fragment>
    );
  }
}
