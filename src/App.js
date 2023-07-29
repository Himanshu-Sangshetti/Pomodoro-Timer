import React, { useState, useRef } from 'react';
import { Button, Typography, Container } from '@material-ui/core';
import { PlayCircleOutline, PauseCircleOutline, Refresh } from '@material-ui/icons';
import './App.css';

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const startTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timerRef.current);
          setIsRunning(false);
        }
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <Container maxWidth="sm" className="pomodoro-container">
      <Typography variant="h3" gutterBottom>
        Pomodoro Timer
      </Typography>
      <Typography variant="h4" gutterBottom>
        {formatTime(minutes)}:{formatTime(seconds)}
      </Typography>
      <div className="buttons-container">
        {!isRunning ? (
          <Button variant="contained" color="primary" startIcon={<PlayCircleOutline />} onClick={startTimer}>
            Start
          </Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<PauseCircleOutline />} onClick={pauseTimer}>
            Pause
          </Button>
        )}
        <Button variant="contained" color="secondary" startIcon={<Refresh />} onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </Container>
  );
};

export default App;
