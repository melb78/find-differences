import React, { useState, useEffect } from "react";
import { db } from "./Services/firestore";
import "./App.css";

const App = () => {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    // const d = db.ref("/levels").on("value", function (snapshot) {
    //   console.log(Object.entries(snapshot.val()).map(x => x[1]) );
    // });

    db.ref("/levels").once("value")
    .then(snapshot => {
      
      const levels = Object.entries(snapshot.val()).map(x => x[1]);
      setLevelArr(levels);
      // console.log(levels);

      setLeft(levels[0]);
      setRight(levels[0]);
    })
    
    return () => {};
  }, []);

  const [levelArr, setLevelArr] = useState([]);
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});

  const relativeCoords = ( event ) => {
    console.log(event.target.width);
    var bounds = event.target.getBoundingClientRect();
    var x1 = event.clientX - bounds.left;
    var y2 = event.clientY - bounds.top;
    setX(x1);
    setY(y2);
  }

  return (
    <div className="App">
      <div className="header">
        <progress value="32" max="100"> 32% </progress>
        <span>X: {x} - Y:{y}</span>
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
