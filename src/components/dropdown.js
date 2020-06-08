import React from 'react';

class Dropdown extends React.Component {

  render() {
    return (
      <select>
        {
          this.props.options.map(o =>
            <option
              value={o}
              selected={o === this.props.value}
              onClick={this.props.onClick}>
                {o}
            </option>
          )
        }
      </select>
    );
  }

}

export default Dropdown;