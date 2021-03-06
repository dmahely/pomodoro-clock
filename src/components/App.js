import React from 'react';
import { Timer } from './Timer';
import { Title } from './Title';
import { Length } from './Length';
import { Button } from './Button';
import { ALERT_SOUND, INITIAL_STATE } from '../constants';

class App extends React.Component {
state = INITIAL_STATE;

componentDidMount = () => {
  const sessionDuration = this.state.sessionDuration;
  const timeLeft = this.formatTime(sessionDuration, 0);
  this.setState({ timeLeft });
};

// for incrementing either break or session length
incrementDuration = (e) => {
  const target = e.target.id;
  const isTimerRunning = this.state.isTimerRunning;

  switch (target) {
    case "session-increment":
      let sessionDuration = this.state.sessionDuration;
      if (sessionDuration < 60 && !isTimerRunning) {
        sessionDuration++;
        const timeLeft = this.formatTime(sessionDuration, 0);
        this.setState({ sessionDuration, timeLeft });
      }
      break;
    case "break-increment":
      let breakDuration = this.state.breakDuration;
      if (breakDuration < 60 && !isTimerRunning) {
        breakDuration++;
        this.setState({ breakDuration });
      }
      break;
      default:
        break;
  }
};

// for decrementing either break or session length
decrementDuration = (e) => {
  const target = e.target.id;
  const isTimerRunning = this.state.isTimerRunning;

  switch (target) {
    case "session-decrement":
      let sessionDuration = this.state.sessionDuration;
      if (sessionDuration > 1 && !isTimerRunning) {
        sessionDuration--;
        const timeLeft = this.formatTime(sessionDuration, 0);
        this.setState({ sessionDuration, timeLeft });
      }
      break;
    case "break-decrement":
      let breakDuration = this.state.breakDuration;
      if (breakDuration > 1 && !isTimerRunning) {
        breakDuration--;
        this.setState({ breakDuration });
      }
      break;
      default:
        break;
  }
};

// resets the app to its default state
resetDurations = () => {
  this.setState(INITIAL_STATE);
  this.clearCurrentInterval();
  // stops alert sound
  const audio = document.getElementById("beep");
  audio.pause();
  audio.currentTime = 0;
};

// starts or stops the current session
startStopSession = () => {
  const {
    sessionDuration,
    breakDuration,
    currentSessionType,
    timeLeft,
    isTimerRunning
  } = this.state;

  // if isTimerRunning is true, pause the timer
  if (isTimerRunning) {
    this.setState({
      isTimerRunning: false,
      sessionDuration,
      breakDuration
    });

    this.clearCurrentInterval();
  } else {
    // if isTimerRunning is false, start playing the timer
    this.setState({
      isTimerRunning: true
    });

    const intervalID = this.startInterval(currentSessionType, timeLeft);

    // sets interval id in state
    this.setState({ intervalID });
  }
};

// starts counting down based on length
startInterval = (currentSessionType, timeLeft) => {
  let min = timeLeft.slice(0, 2); // gets first two characters
  let sec = timeLeft.slice(-2); // gets last two characters
  const interval = setInterval(() => {
    if (sec === '00' || sec === 0) {
      min--;
      sec = 59;
    } else {
      sec--;
    }

    const timeLeft = this.formatTime(min, sec);
    this.setState({ timeLeft });
    if (min < 0) {
      // clear interval
      this.clearCurrentInterval();
      // play alert sound
      this.playAlertSound();
      // updates isTimerRunning to false
      this.setState({ isTimerRunning: false });

      // checks the type of current session and starts next one
      if (currentSessionType === "work") {
        this.setState({
          timeLeft: this.formatTime(this.state.breakDuration, 0),
          currentSessionType: "break",
          isTimerRunning: false
        });
      } else {
        this.setState({
          timeLeft: this.formatTime(this.state.sessionDuration, 0),
          currentSessionType: "work",
          isTimerRunning: false
        });
      }
      this.startStopSession();
    }
  }, 1000);
  return interval;
};

// clears the current interval i.e. if stopped or reset
clearCurrentInterval = () => {
  clearInterval(this.state.intervalID);
};

// plays sound indicating end of session
playAlertSound = () => {
  const audio = document.getElementById("beep");
  audio.play();
};

// formats passed min and sec to readable format
formatTime = (min, sec) => {
  // pads min/sec with a leading 0 if less than 10
  min = min.toString().padStart(2, 0);
  sec = sec.toString().padStart(2, 0);
  const timeLeft = min + ":" + sec;

  return timeLeft;
};

render() {
  return (
    <div id="container">
      <Title title="Pomodoro Clock" />
      <Timer
        currentSessionType={this.state.currentSessionType}
        timeLeft={this.state.timeLeft}
        timeLeftId="time-left"
        sessionTitle={this.state.currentSessionType === 'work' ? "Let's get to Work!" : "Time for a Break!"}
        labelId="timer-label"
      />
      <div className="buttons-container">
        <Button
          buttonId="start_stop"
          text="Start/Stop"
          onClick={this.startStopSession}
        />
        <Button 
          buttonId="reset" 
          text="Reset" 
          onClick={this.resetDurations} 
        />
      </div>
      <div className="length-container">
        <Length
          text="Session Length"
          textId="session-label"
          decrementId="session-decrement"
          incrementId="session-increment"
          durationId="session-length"
          time={this.state.sessionDuration}
          incrementMethod={this.incrementDuration}
          decrementMethod={this.decrementDuration}
        />
        <Length
          text="Break Length"
          textId="break-label"
          decrementId="break-decrement"
          incrementId="break-increment"
          durationId="break-length"
          time={this.state.breakDuration}
          incrementMethod={this.incrementDuration}
          decrementMethod={this.decrementDuration}
        />
      </div>
      <audio id="beep">
        <source src={ALERT_SOUND} type="audio/mpeg" />
      </audio>
    </div>
  );
}
}

export default App;
