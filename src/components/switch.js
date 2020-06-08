import React from 'react';

class Switch extends React.Component {

  render() {
    return (
      <>
        <div>
          <input
            type={'radio'}
            checked={this.props.value === 'a'}
            onClick={(e) => this.props.onChange('reflector', e.target.value)}
            value='a'
          />
          <label>{'A'}</label>
        </div>

        <div>
          <input
            type={'radio'}
            checked={this.props.value === 'b'}
            onClick={(e) => this.props.onChange('reflector', e.target.value)}
            value='b'
          />
          <label>{'B'}</label>
        </div>
      </>
    );
  }
}

export default Switch;