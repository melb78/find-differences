import React, { useState, useEffect } from "react";

export const CountDownTimer = ({ second }) => {
  const [counter, setCounter] = useState(second);

  let min = Math.floor((counter % 3600) / 60);
  let sec = Math.floor((counter % 3600) % 60);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const formatTime = (n) =>
    n.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    
  return (
    <div id="progressBar">
      <div id="bar">{formatTime(min)}:{formatTime(sec)}</div>
    </div>
  );
};
