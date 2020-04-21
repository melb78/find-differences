import React, { useState, useEffect, useRef } from "react";
import { CountDownTimer } from "./Components/CountDownTimer";
import { db } from "./Services/firestore";
import "./App.css";

const App = () => {
  const [levelArr, setLevelArr] = useState([]);
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [second, setSecond] = useState(120);

  const [canvasContext, setCanvasContext] = useState(null)
  const canvas = useRef(null);
  const leftImage = useRef(null);
  
  // const chartPositionData = [
  //   {"x": 560 ,"y": 181.8125},
  //   {"x": 481 ,"y": 215.8125},
  //   {"x": 88  ,"y": 50.8125},
  //   {"x": 85  ,"y": 267.8125},
  //   {"x": 426 ,"y": 359.8125},
  //   {"x": 262 ,"y": 315.8125},
  //   {"x": 456 ,"y": 550.8125},
  //   {"x": 189 ,"y": 561.8125},
  //   {"x": 43  ,"y": 469.8125},
  //   {"x": 394 ,"Y": 39.8125}
  // ];

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    // canvas.current.width = 600;
    // canvas.current.height = 600;

    fitToContainer(canvas.current);
    setCanvasContext(ctx);

    db.ref("/levels")
      .once("value")
      .then((snapshot) => {
        const levels = Object.entries(snapshot.val()).map((x) => x[1]);
        setLevelArr(levels);
        setLeft(levels[0]);
        setRight(levels[0]);
      });

      leftImage.current.onload = () => {
        canvas.current.getContext("2d").drawImage(leftImage.current, 0, 0, canvas.current.width, canvas.current.height);
      }

    return () => {};
  }, []);

  const fitToContainer = (canvas) => {
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  const relativeCoords = (event) => {
    var bounds = event.target.getBoundingClientRect();
    var x1 = (event.clientX - bounds.left) / bounds.width * event.target.width;
    var y2 = (event.clientY - bounds.top) / bounds.height * event.target.height;

    setX(x1);
    setY(y2);

    canvasContext.fill = 'green';
    canvasContext.beginPath();
    canvasContext.arc(x1, y2, 20, 0, 2 * Math.PI);
    canvasContext.stroke();
  };

  return (
    <div className="App">
      <div className="header">
        <CountDownTimer second={second} />
        <span>X: {x} - Y:{y}</span>
      </div>

      <div className="container">
        <div className="left-half">
          <canvas ref={canvas} onMouseDown={relativeCoords}></canvas>
        </div>

        <div className="right-half">
          <img
            className="compare-image"
            src={right.right || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
            onMouseDown={relativeCoords}
          />
        </div>
      </div>

      <img
        ref={leftImage}
        className="compare-image"
        src={left.left || "https://via.placeholder.com/400x300"}
        alt="Uploaded Images"
      />
    </div>
  );
};

export default App;
