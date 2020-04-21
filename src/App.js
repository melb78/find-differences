import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    db.ref("/levels")
      .once("value")
      .then((snapshot) => {
        const levels = Object.entries(snapshot.val()).map((x) => x[1]);
        setLevelArr(levels);
        setLeft(levels[0]);
        setRight(levels[0]);
      });

    return () => {};
  }, []);

  const relativeCoords = (event) => {
    console.log(event.target.width);
    var bounds = event.target.getBoundingClientRect();
    var x1 = event.clientX - bounds.left;
    var y2 = event.clientY - bounds.top;
    setX(x1);
    setY(y2);
  };

  const calculatePosition = (posX, posY) => {
    
  }

  return (
    <div className="App">
      <div className="header">
        {/* <progress value="50" max="100"></progress> */}
        <CountDownTimer second={second} />
        {/* <span>X: {x} - Y:{y}</span> */}
      </div>

      <div className="container">
        <div className="left-half">
          <img
            className="compare-image"
            src={left.left || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
            onMouseDown={relativeCoords}
          />
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
    </div>
  );
};

export default App;
