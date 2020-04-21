import React, { useState, useEffect } from "react";

export const CountDownTimer = ({ second, guessWorngHandler }) => {
  const [counter, setCounter] = useState(second);
  
  const min = Math.floor((counter % 3600) / 60);
  const sec = Math.floor((counter % 3600) % 60);
  const milliSec = (counter % 1) * 100;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isGuessWrong = () => {
    return guessWorngHandler();
  }

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => {
      let newCounter = counter - 0.02;
      if (isGuessWrong())
      {
        newCounter -= 5;
      }

      if (newCounter < 0)
      {
        newCounter = 0;
      }

      setCounter(newCounter);
    }, 20);
    return () => clearInterval(timer);
  }, [counter, isGuessWrong]);

  const formatTime = (n, minDigit = 2) =>
    n.toLocaleString("en-US", { minimumIntegerDigits: minDigit, useGrouping: false });
    
  return (
    <div id="progressBar">
      <div id="bar">{formatTime(min)}:{formatTime(sec)}:{formatTime(milliSec)}</div>
    </div>
  );
};
