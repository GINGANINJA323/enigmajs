import React, { Component } from 'react';

class Tabview extends React.Component {
  render() {
    return (
      <>
        {
          Object.keys(this.props.tabs).map(t => 
              <button
                label={this.props.tabs[t]}
                onClick={() => this.props.onChangeTab(t)}
              />
            )
        }
      </>
    )
  }
}

export default Tabview;