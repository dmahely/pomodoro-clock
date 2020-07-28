import React from 'react';

class Timer extends React.Component {
    render() {
      return (
        <div>
          <h2 id={this.props.labelId}>{this.props.sessionTitle}</h2>
          <p id={this.props.timeLeftId}>{this.props.timeLeft}</p>
        </div>
      );
    }
  }

export default Timer;