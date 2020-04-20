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
      <img
          id="img-Left"
          src={left.left || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
      
      <img
          id="img-Right"
          src={right.right || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
    </div>
  );
};

export default App;
