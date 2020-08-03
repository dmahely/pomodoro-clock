import React from 'react';

class Length extends React.Component {
    render() {
      return (
        <div>
          <h3 id={this.props.textId}>{this.props.text}</h3>
          <button
            className="noselect"
            id={this.props.incrementId}
            onClick={this.props.incrementMethod}
          >
            ⇧
          </button>
          <p id={this.props.durationId}>{this.props.time}</p>
          <button
            className="noselect"
            id={this.props.decrementId}
            onClick={this.props.decrementMethod}
          >
            ⇩
          </button>
        </div>
      );
    }
  }

export { Length };