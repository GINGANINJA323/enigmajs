import React, { Component } from 'react';

class Plugboard extends React.Component {
  render() {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
      <>
        <table>
          <thead>
            <tr colSpan={2}>
              <td>
                <h1>{'Plugboard'}</h1>
                  <p>{'Enter characters to pair them.'}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {
              alphabet.map(l => 
                  <tr key={l}>
                    <td>{l}</td>
                    <td>
                      <input
                        value={this.props.steckerPairs[l]}
                        placeholder={'Input Stecker partner.'}
                        onChange={(e) => this.props.onChange(l, e.target.value)}
                        maxLength={1}
                        type={'text'}
                      />
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </>
    );
  }
}

export default Plugboard;