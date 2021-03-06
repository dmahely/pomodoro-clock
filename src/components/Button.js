import React from 'react';

class Button extends React.Component {
    render() {
      return (
        <button className="noselect" id={this.props.buttonId} onClick={this.props.onClick}>
          {this.props.text}
        </button>
      );
    }
  }

export { Button };