import React from 'react';

const reflectors = [
  {
    name: 'Wide B',
    value: 'b'
  },
  {
    name: 'Wide C',
    value: 'c'
  },
  {
    name: 'Thin B',
    value: 'tb'
  },
  {
    name: 'Thin C',
    value: 'tc'
  }
]

class Switch extends React.Component {
  
  render() {
    return (
      <>
        {
          reflectors.map((r) => (
            <div>
              <input
                type={'radio'}
                checked={this.props.value === r.value}
                onClick={(e) => this.props.onChange('reflector', e.target.value)}
                value={r.value}
              />
              <label>{r.name}</label>
            </div>
          ))
        }
      </>
    );
  }
}

export default Switch;