import "./App.css";
import Tetris from "./components/Tetris";

function App() {
  const class1 = "text-bg-light";
  return (
    <div>
      <div id="header">
        <header id="header-title" className={`${class1} text-uppercase`}>
          <span>Tetris</span>
        </header>
        <header id="header-image" className={class1}>
          <img src="src/images/tetris.png" alt="tetris" />
        </header>
      </div>
      <Tetris className="pixel"></Tetris>
    </div>
  );
}

export default App;
