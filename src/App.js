import React, { useState, useEffect } from "react";
import { db } from "./Services/firestore";
import "./App.css";

const App = () => {

  useEffect(() => {
    // const d = db.ref("/levels").on("value", function (snapshot) {
    //   console.log(Object.entries(snapshot.val()).map(x => x[1]) );
    // });

    db.ref("/levels").once("value")
    .then(snapshot => {
      
      const levels = Object.entries(snapshot.val()).map(x => x[1]);
      setLevelArr(levels);
      console.log(levels);

      setLeft(levels[0]);
      setRight(levels[0]);
    })
    
    return () => {};
  }, []);

  const [levelArr, setLevelArr] = useState([]);
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});

  return (
    <div className="App">
      <div className="header">
        <progress value="32" max="100"> 32% </progress>
      </div>

      <div className="container">
        <img
            id="items"
            src={left.left || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
          />
        
        <img
            id="items"
            src={right.right || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
          />
      </div>
    </div>
  );
};

export default App;
