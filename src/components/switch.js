import React from 'react';

class Switch extends React.Component {

  render() {
    return (
      <>
        <div>
          <input
            type={'radio'}
            checked={this.props.value === 'b'}
            onClick={(e) => this.props.onChange('reflector', e.target.value)}
            value='b'
          />
          <label>{'Wide B'}</label>
        </div>

        <div>
          <input
            type={'radio'}
            checked={this.props.value === 'c'}
            onClick={(e) => this.props.onChange('reflector', e.target.value)}
            value='c'
          />
          <label>{'Wide C'}</label>
        </div>
      </>
    );
  }
}

export default Switch;