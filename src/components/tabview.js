import React, { Component } from 'react';

class Tabview extends React.Component {
  render() {
    return (
      <>
        {
          Object.keys(this.props.tabs).map(t => 
              <button
                onClick={() => this.props.onChangeTab(t)}
              >{this.props.tabs[t]}
              </button>
            )
        }
      </>
    )
  }
}

export default Tabview;