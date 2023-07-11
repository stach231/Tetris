import { useEffect, useState } from "react";
import "./App.css";
import Tetris from "./components/Tetris";

function App() {
  const class1 = "text-bg-light";

  const [click, setClick] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") setClick(1);
      else if (event.code === "ArrowRight") setClick(2);
      else if (event.code === "Space") setClick(3);
    });
  }, []);

  return (
    <div id="container">
      <div id="header">
        <header id="header-title" className={`${class1} text-uppercase`}>
          <span>Tetris</span>
        </header>
        <header id="header-image" className={class1}>
          <img src="src/images/tetris.png" alt="tetris" />
        </header>
      </div>
      <div id="rest">
        <Tetris className="pixel"></Tetris>
        <div id="sidebar">
          <div id="score">
            <span>PUNKTY</span>
            <span>100</span>
          </div>
          <div id="next">
            <span>NASTĘPNY BLOK</span>
            <div id="next-block"></div>
          </div>
          <div id="buttons">
            <div id="up-button">
              <img src="src/images/up.png"></img>
            </div>
            <div id="middle-buttons">
              {click != 1 ? (
                <img src="src/images/left.png"></img>
              ) : (
                <img src="src/images/left.png" className="shadow"></img>
              )}
              <img src="src/images/push.png"></img>
              {click != 2 ? (
                <img src="src/images/right.png"></img>
              ) : (
                <img src="src/images/right.png" className="shadow"></img>
              )}
            </div>
            <div id="bottom-button">
              <img src="src/images/down.png"></img>
            </div>
          </div>
          <div id="turn-button">
            {click != 3 ? (
              <img src="src/images/turn_right.png"></img>
            ) : (
              <img src="src/images/turn_right.png" className="shadow"></img>
            )}
          </div>
          <button id="start" className="btn btn-light">
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
