import { useEffect, useRef, useState } from "react";
import "./App.css";
import Tetris from "./components/Tetris";
import Info from "./components/Info";

function App() {
  const [click, setClick] = useState(0);
  const [score, setScore] = useState(0);
  const [shape, setShape] = useState(-1);
  const shapeRef = useRef(shape);
  const [start, setStart] = useState(false);
  const startRef = useRef(start);
  const [results, setResults] = useState<[number, Date][]>([]);
  const resultsRef = useRef(results);
  const [isStart, setIsStart] = useState(false);
  const isStartRef = useRef(isStart);
  const [isEnd, setIsEnd] = useState(true);
  const isEndRef = useRef(isEnd);

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
    "6-blue",
    "6-green",
    "6-red",
    "6-yellow",
  ];

  const handleScoreChange = (score1: number) => {
    setScore(score1);
  };

  const handleShapeChange = (shape1: number) => {
    setShape(shape1);
    shapeRef.current = shape1;
    console.log(`Shape: Atr: ${shape1} Ref: ${shapeRef.current}`);
  };

  const handleResults = (result: [number, Date]) => {
    console.log(result);
    setResults((prevResult) => (prevResult = [...prevResult, result]));
    resultsRef.current = [...results, result];
    console.log(`Tu jest wynik: ${resultsRef.current} |${results}|`);
  };

  const handleIsEnd = (end: boolean) => {
    console.log(`Boolean end: ${end}`);
    console.log(`Changed end: ${isEnd}`);
    setIsEnd(end);
    isEndRef.current = end;
    console.log(`Changed end: ${isEnd}`);
    if (end) {
      setShape(-1);
    }
  };

  const clickStart = () => {
    setStart((prevStart) => !prevStart);
    setIsEnd(false);
    isEndRef.current = false;
    startRef.current === false
      ? (startRef.current = true)
      : (startRef.current = false);
    isStartRef.current = true;
    console.log(`START: ${start} IsStart: ${isStartRef.current}`);
  };

  const event1 = (event: KeyboardEvent) => {
    event.preventDefault();
    console.log(`isEnd: ${isEnd}`);
    if (!isEndRef.current) {
      if (event.code === "ArrowLeft") setClick(1);
      else if (event.code === "Enter") setClick(2);
      else if (event.code === "ArrowRight") setClick(3);
      else if (event.code === "ArrowDown") setClick(4);
      else if (event.code === "Space") setClick(5);
    } else {
      setClick(0);
    }
  };

  const deleteResult = (index: number) => {
    setResults((prevResults) =>
      prevResults.filter((item, ind) => ind !== index)
    );
  };

  useEffect(() => {
    setScore(0);
    console.log(`App isEnd: ${isEnd}`);
    if (!isEndRef.current) {
      window.addEventListener("keydown", event1);
    }
    return () => {
      window.removeEventListener("keydown", event1);
    };
  }, [start]);

  useEffect(() => {
    setClick(0);
  }, [isEndRef.current]);

  return (
    <>
      <div id="item1">
        <header id="header" className={`text-bg-light text-uppercase`}>
          <span>INFORMACJE O GRZE</span>
          <Info></Info>
        </header>
      </div>
      <div id="item2">
        <header id="header" className={`text-bg-light text-uppercase`}>
          <span>Tetris</span>
          <img src="src/images/tetris.png" alt="tetris" />
        </header>
        <div id="rest">
          <Tetris
            className="pixel"
            onScoreChange={handleScoreChange}
            onShapeChange={handleShapeChange}
            onResultChange={handleResults}
            start={startRef.current}
            isStart={isStartRef.current}
            isEnd={isEndRef.current}
            onIsEndChange={handleIsEnd}
          ></Tetris>
          <div id="sidebar">
            <div id="score">
              <span>PUNKTY</span>
              <span>{isStartRef.current ? score : ""}</span>
            </div>
            <div id="next">
              <span>NASTĘPNY BLOK</span>
              <div id="next-block">
                <img
                  src={
                    shapeRef.current !== -1 &&
                    !isEndRef.current &&
                    isStartRef.current
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
                {click != 2 ? (
                  <img src="src/images/push.png"></img>
                ) : (
                  <img src="src/images/push.png" className="shadow"></img>
                )}
                {click != 3 ? (
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
              {click != 5 ? (
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
      <div id="item1">
        <header id="header" className={`text-bg-light text-uppercase`}>
          <span>WYNIKI</span>
        </header>
        <li id="li-title">
          <div className="group">
            <div>
              <span>Nr</span>
            </div>
            <div>
              <span>Punkty</span>
            </div>
            <div>
              <span>Data gry</span>
            </div>
          </div>
        </li>
        <ul>
          {results.map((item, index) => (
            <li className="list-group-item">
              <div className="group">
                <div>
                  <span>{`${index + 1}.`}</span>
                </div>
                <div>
                  <span>{item[0]}</span>
                </div>
                <div>
                  <span>{item[1].toLocaleString()}</span>
                </div>
                <button
                  className="btn-close"
                  onClick={() => {
                    deleteResult(index), false;
                  }}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
