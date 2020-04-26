import React, { useState, useEffect, useRef } from "react";
import { CountDownTimer } from "./Components/CountDownTimer";
import { db } from "./Services/firestore";
import "./App.css";

const App = () => {
  const [levelArr, setLevelArr] = useState([]);

  const [currentLevel, setCurrentLevel] = useState(null);

  const [matchedIndexes, setMatchedIndexes] = useState([]);

  const [leftCanvasContext, setLeftCanvasContext] = useState(null);
  const [rightCanvasContext, setRightCanvasContext] = useState(null);
  const [guessWrong, setGuessWrong] = useState(false);

  const leftCanvas = useRef(null);
  const rightCanvas = useRef(null);
  const leftImage = useRef(null);
  const rightImage = useRef(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    fitToContainer(leftCanvas.current);
    setLeftCanvasContext(leftCanvas.current.getContext("2d"));
    fitToContainer(rightCanvas.current);
    setRightCanvasContext(rightCanvas.current.getContext("2d"));

    db.ref("/levels")
      .once("value")
      .then((snapshot) => {
        const levels = Object.entries(snapshot.val()).map((x) => x[1]);

        console.log(levels);

        setLevelArr(levels);
        setCurrentLevel(levels[0]);
      });

    leftImage.current.onload = () => {
      leftCanvas.current
        .getContext("2d")
        .drawImage(
          leftImage.current,
          0,
          0,
          leftCanvas.current.width,
          leftCanvas.current.height
        );
    };

    rightImage.current.onload = () => {
      rightCanvas.current
        .getContext("2d")
        .drawImage(
          rightImage.current,
          0,
          0,
          rightCanvas.current.width,
          rightCanvas.current.height
        );
    };

    return () => {};
  }, []);

  const fitToContainer = (canvas) => {
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = window.innerWidth / 2; //canvas.offsetWidth;
    canvas.height = window.innerHeight - 100; //canvas.offsetHeight + 400;

    console.log("Canvas");
    console.log(canvas.width);
    console.log(canvas.height);
  };

  const relativeCoords = (event) => {
    var bounds = event.target.getBoundingClientRect();

    console.log(bounds);
    const { clientX, clientY } = event;
    let targetWidth = event.target.width;
    let targetHeight = event.target.height;
    console.log(clientX);
    console.log(clientY);
    targetWidth = 940;
    targetHeight = 877;

    // console.log(clientX - bounds.left);
    // console.log(clientY - bounds.top);

    const left = ((clientX - bounds.left) / bounds.width) * targetWidth;
    const top = ((clientY - bounds.top) / bounds.height) * targetHeight;

    setX(clientX - bounds.left);
    setY(clientY - bounds.top);

    if (Array.isArray(currentLevel.results)) {
      const foundResult = currentLevel.results.find((r) =>
        isInRect(r, top, left)
      );
      if (foundResult !== undefined) {
        const foundIndex = currentLevel.results.indexOf(foundResult);
        if (!matchedIndexes.includes(foundIndex)) {
          setMatchedIndexes([...matchedIndexes, foundIndex]);

          const x0 = (foundResult.x0 / targetWidth) * bounds.width;
          const x1 = (foundResult.x1 / targetWidth) * bounds.width;
          const y0 = (foundResult.y0 / targetHeight) * bounds.height;
          const y1 = (foundResult.y1 / targetHeight) * bounds.height;

          const rx = (x1 - x0) / 2;
          const ry = (y1 - y0) / 2;
          const cx = x0 + rx;
          const cy = y0 + ry;

          [leftCanvasContext, rightCanvasContext].forEach((ct) => {
            ct.strokeStyle = "red";
            ct.lineWidth = 4;
            ct.beginPath();
            ct.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI, false);
            ct.stroke();
          });
        }
      } else {
        setGuessWrong(true);
      }
    }
  };

  const isInRect = (result, top, left) => {
    const { x0, y0, x1, y1 } = result;
    if (top < y0 || top > y1 || left < x0 || left > x1) {
      return false;
    }

    return true;
  };

  const guessWorngHandler = () => {
    if (guessWrong) {
      setGuessWrong(false);
      return true;
    }

    return false;
  };

  return (
    <div className="App">
      <div className="header">
        <CountDownTimer second={120} guessWorngHandler={guessWorngHandler} />
        <span>
          X: {x} - Y:{y}
        </span>
      </div>

      <div className="container">
        <div className="left-half">
          <canvas ref={leftCanvas} onMouseDown={relativeCoords}></canvas>
          <img
            ref={leftImage}
            className="hiden-Image"
            src={
              (currentLevel && currentLevel.left) ||
              "https://via.placeholder.com/400x300"
            }
            alt="Uploaded Images"
          />
        </div>

        <div className="right-half">
          <canvas ref={rightCanvas} onMouseDown={relativeCoords}></canvas>
          <img
            ref={rightImage}
            className="hiden-Image"
            src={
              (currentLevel && currentLevel.right) ||
              "https://via.placeholder.com/400x300"
            }
            alt="Uploaded Images"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
