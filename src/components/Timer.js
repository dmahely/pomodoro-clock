import React from 'react';

class Timer extends React.Component {
    render() {
      return (
        <div className="timer-container">
          <h2 id={this.props.labelId}>{this.props.sessionTitle}</h2>
          <h3 id={this.props.timeLeftId}>{this.props.timeLeft}</h3>
        </div>
      );
    }
  }

export { Timer };