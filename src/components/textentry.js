import React, { Component } from 'react';

class TextEntry extends React.Component {
  render() {
    return (
      <textarea
        onChange={(e) => this.props.onChange('plaintext', e.target.value)}
        placeholder={'Enter message here...'}
      />
    )
  }
}

export default TextEntry;