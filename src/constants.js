// default constant values
const DEFAULT_SESSION_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;

export const ALERT_SOUND =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3";
export const INITIAL_STATE = {
  sessionDuration: DEFAULT_SESSION_DURATION,
  breakDuration: DEFAULT_BREAK_DURATION,
  currentSessionType: "work",
  isTimerRunning: false, // whether a session is currently running
  timeLeft: "25:00",
  intervalID: ""
}
