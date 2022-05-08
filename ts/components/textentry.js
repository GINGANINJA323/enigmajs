import React from 'react';

class TextEntry extends React.Component {
  render() {
    return (
      <textarea
        value={this.props.value}
        onChange={(e) => this.props.onChange('plaintext', e.target.value)}
        placeholder={'Enter message here...'}
      />
    )
  }
}

export default TextEntry;