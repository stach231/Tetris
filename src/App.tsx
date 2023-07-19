import { useEffect, useRef, useState } from "react";
import "./App.css";
import Tetris from "./components/Tetris";

function App() {
  const class1 = "text-bg-light";

  const [click, setClick] = useState(0);
  const [score, setScore] = useState(0);
  const [shape, setShape] = useState(-1);
  const shapeRef = useRef(shape);
  const [start, setStart] = useState(false);

  const shapes = [
    "0-blue",
    "0-green",
    "0-red",
    "0-yellow",
    "1-blue",
    "1-green",
    "1-red",
    "1-yellow",
    "2-blue",
    "2-green",
    "2-red",
    "2-yellow",
    "3-blue",
    "3-green",
    "3-red",
    "3-yellow",
    "4-blue",
    "4-green",
    "4-red",
    "4-yellow",
    "5-blue",
    "5-green",
    "5-red",
    "5-yellow",
  ];

  const handleScoreChange = (score: number) => {
    setScore(score);
  };

  const handleShapeChange = (shape1: number) => {
    setShape(shape1);
    shapeRef.current = shape1;
    console.log(`Shape: Atr: ${shape1} Ref: ${shapeRef.current}`);
  };

  const clickStart = () => {
    start === false ? setStart(true) : setStart(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") setClick(1);
      else if (event.code === "ArrowRight") setClick(2);
      else if (event.code === "Space") setClick(3);
      else if (event.code === "ArrowDown") setClick(4);
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
        <Tetris
          className="pixel"
          onScoreChange={handleScoreChange}
          onShapeChange={handleShapeChange}
          start={start}
        ></Tetris>
        <div id="sidebar">
          <div id="score">
            <span>PUNKTY</span>
            <span>{score}</span>
          </div>
          <div id="next">
            <span>NASTĘPNY BLOK</span>
            <div id="next-block">
              <img
                src={
                  shape !== -1
                    ? `src/images/Shapes/${shapes[shapeRef.current]}.png`
                    : ""
                }
              ></img>
            </div>
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
              {click != 4 ? (
                <img src="src/images/down.png"></img>
              ) : (
                <img src="src/images/down.png" className="shadow"></img>
              )}
            </div>
          </div>
          <div id="turn-button">
            {click != 3 ? (
              <img src="src/images/turn_right.png"></img>
            ) : (
              <img src="src/images/turn_right.png" className="shadow"></img>
            )}
          </div>
          <button id="start" className="btn btn-light" onClick={clickStart}>
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
