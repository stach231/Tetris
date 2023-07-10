import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Pixel from "./Pixel";

const width = 11;
const height = 21;
let block = 0;

interface Props {
  className: string;
}

class Block {
  color: string = "#fff";
  x: number = 0;
  y: number = 11;
  shape: number[][] = [];
  shapeId: number = 0;
  constructor(color: string, x: number, shape: number[][], shapeId: number) {
    this.color = color;
    this.x = x;
    this.shape = shape;
    this.shapeId = shapeId;
  }
}

const Tetris = ({ className }: Props) => {
  const [pixelsColors, setPixelColors] = useState<
    [string, number, number, number][]
  >([]);
  const pixelsColorsRef = useRef(pixelsColors);
  const [oldCoords, setOldCoords] = useState<[number, number][]>([]);
  const oldCoordsRef = useRef<[number, number][]>([]);
  const blockScreenRef = useRef<Block | null>(null);
  const [shape, setShape] = useState(createBlock());
  const [gameOver, setGameOver] = useState(0);
  const gameOverRef = useRef(gameOver);

  function setUpPixelColors() {
    const newPixelsColors: [string, number, number, number][] = [];
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 11; j++) {
        newPixelsColors.push(["#fff", 0, -5 + j, 10 - i]);
      }
    }
    pixelsColorsRef.current = newPixelsColors;
    return [...newPixelsColors];
  }

  function playGameOver() {
    let i = 230;
    let tribe = 0;
    const over = setInterval(() => {
      console.log(`I: ${i}`);
      const pixel = [...pixelsColorsRef.current];
      if (tribe === 0) pixel[i][0] = "#777";
      else if (tribe === 1) pixel[i][0] = "#fff";
      setPixelColors(pixel);
      i--;
      if (i === -1 && tribe === 0) {
        i = 230;
        tribe = 1;
      } else if (i === -1 && tribe === 1) {
        clearInterval(over);
      }
    }, 5);
  }

  function checkOver() {
    console.log("Check Over 1");
    const old: [number, number][] = [];
    blockScreenRef.current?.shape.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x,
        item[1] + blockScreenRef.current!.y,
      ]);
    });
    console.log(`Check Over 2: ${old.length}`);
    old.forEach((item) => {
      pixelsColorsRef.current.forEach((item2) => {
        console.log(
          `Check Over 3: I1 - ${item}, I2 - ${item2}, G - ${gameOver} S - ${
            blockScreenRef.current?.shape
          }: X:${blockScreenRef.current!.x},Y:${blockScreenRef.current!.y}`
        );
        if (
          (item[0] === item2[2] && item[1] === item2[3] && item2[1] === 2) ||
          item[1] > 10
        ) {
          gameOverRef.current = 1;
        }
      });
    });
  }

  function createBlock() {
    const shapes = [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ];

    let color: string = "#fff";
    const drawColor: number = Math.floor(Math.random() * 4);
    if (drawColor === 0) {
      color = "#f00";
    } else if (drawColor === 1) {
      color = "#0f0";
    } else if (drawColor === 2) {
      color = "#00f";
    } else {
      color = "#ff0";
    }
    const drawShape = Math.floor(Math.random() * 6);
    const blockShape = shapes[drawShape];
    let x = 0;
    if (drawShape === 0) {
      x = 3 - Math.floor(Math.random() * 8);
    } else if (drawShape === 1 || drawShape === 2) {
      x = 5 - Math.floor(Math.random() * 9);
    } else if (drawShape === 3 || drawShape === 5) {
      x = 4 - Math.floor(Math.random() * 10);
    } else if (drawShape === 4) {
      x = 5 - Math.floor(Math.random() * 10);
    }

    return new Block(color, x, blockShape, drawShape);
  }

  function startGame() {
    const shapes = [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ];

    let blockScreen: Block = createBlock();

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
        //console.log("ArrowLeft");
        moveBlock(-1);
      } else if (event.code === "ArrowRight") {
        //console.log("ArrowRight");
        moveBlock(1);
      } else if (event.code === "Space") {
        //console.log("Space");
        rotateBlock();
      }
    });

    blockScreenRef.current = blockScreen;

    return blockScreen;
  }

  function checkLine() {
    const colors: number[] = [];
    let [color, line, flag] = ["", 10, true];
    pixelsColorsRef.current.forEach((item, index) => {
      console.log(`C: ${color} L: ${line} F: ${flag}`);
      if (item[3] !== line) {
        console.log(`New line ${item[3]} Color: ${color}`);

        line = item[3];
        color = "";
        flag = true;
      }
      if (item[0] === "#fff" || (color !== "" && item[0] !== color)) {
        console.log(`Linia ${line}: Brak zgodności`);
        flag = false;
      }
      color = item[0];
      if (index % 11 === 10 && flag) {
        if (color != "" && flag === true) {
          colors.push(line);
          console.log(`Dodano do tabeli ${line}`);
        }
      }
    });
    console.log(`Długość colors: ${colors.length}`);
    colors.forEach((item) => {
      console.log(`Działania na tabeli: ${(-item + 10) * 11}`);
      pixelsColorsRef.current.splice((-item + 10) * 11, 11);
      pixelsColorsRef.current.forEach((item2, index) => {
        if (item2[3] > item) item2[3]--;
      });
      for (let i = 0; i < 11; i++) {
        pixelsColorsRef.current.unshift(["#fff", 0, 5 - i, 10]);
      }
    });
    setPixelColors([...pixelsColorsRef.current]);
  }

  function moveBlock(direct: number) {
    setOldCoords([]);
    //console.log(`Kształt1: ${blockScreenRef.current?.shape}`);console.log(  `old coord1: ${oldCoords.length} ${blockScreenRef.current?.shape.length} Shape: ${blockScreenRef.current!.x}, ${blockScreenRef.current!.y}`);

    const old: [number, number][] = [];
    //console.log(`-1 Przesunięcie: ${blockScreenRef.current?.shape.length}`);
    blockScreenRef.current?.shape.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x,
        item[1] + blockScreenRef.current!.y,
      ]);
    });
    setOldCoords(old);
    oldCoordsRef.current = old;
    //console.log(`-2 ${oldCoordsRef.current.length}`);

    //console.log(
    //  `Przesunięcie: ${blockScreenRef.current!.y} ${
    //    oldCoordsRef.current.length
    //  }`
    //);
    let flag = true;
    const newCoords: number[][] = [];
    if (direct === 0) {
      oldCoordsRef.current.forEach((coord) => {
        if (coord[1] - 1 < -10) flag = false;
        else if (coord[1] <= 11) newCoords.push([coord[0], coord[1] - 1]);
      });
      //console.log(`Flaga1: ${flag}`);
      if (flag) {
        //console.log(`Flaga2: ${flag}`);
        if (flag) {
          pixelsColorsRef.current.forEach((item) => {
            if (item[1] === 1) {
              item[1] = 0;
              item[0] = "#fff";
            }
          });
          newCoords.forEach((item) => {
            pixelsColorsRef.current.forEach((item2) => {
              //console.log("Zmiana na 1 (1)");
              if (
                item[0] === item2[2] &&
                item[1] === item2[3] &&
                item2[1] === 2
              ) {
                //console.log("F11");
                flag = false;
              }
            });
          });
          //console.log(`Flag 22: ${flag}`);
          if (flag) {
            //console.log("F1");
            newCoords.forEach((item) => {
              pixelsColorsRef.current.forEach((item2) => {
                if (item[0] === item2[2] && item[1] === item2[3]) {
                  item2[1] = 1;
                  item2[0] = blockScreenRef.current!.color;
                }
              });
            });
          } else {
            //console.log("F2");
            checkOver();
            oldCoordsRef.current.forEach((item) => {
              pixelsColorsRef.current.forEach((item2) => {
                if (item[0] === item2[2] && item[1] === item2[3]) {
                  //console.log("F21");
                  item2[1] = 2;
                  item2[0] = blockScreenRef.current!.color;
                }
              });
            });
            console.log("CheckLine 1");
            checkLine();
            blockScreenRef.current = createBlock();
            setShape(blockScreenRef.current);
          }
          //console.log(`Flaga3: ${flag}`);
          if (flag) {
            blockScreenRef.current!.y--;
          } else {
            flag = true;
          }
        }
      } else {
        pixelsColorsRef.current.map((item) => {
          if (item[1] === 1) {
            item[1] = 2;
          }
        });
        console.log("CheckLine 2");
        checkLine();
        blockScreenRef.current = createBlock();
        setShape(blockScreenRef.current);
        flag = true;
      }
    } else if (direct === 1) {
      oldCoordsRef.current.forEach((coord) => {
        if (coord[0] + 1 > 5) flag = false;
        else newCoords.push([coord[0] + 1, coord[1]]);
      });
      if (flag) {
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        newCoords.forEach((item) => {
          if (
            pixelsColorsRef.current[(-item[1] + 10) * 11 + (item[0] + 5)][1] ===
            2
          ) {
            flag = false;
          }
        });
        if (flag) {
          newCoords.forEach((item) => {
            pixelsColorsRef.current.forEach((item2) => {
              if (item[0] === item2[2] && item[1] === item2[3]) {
                item2[1] = 1;
                item2[0] = blockScreenRef.current!.color;
              }
            });
          });
          blockScreenRef.current!.x++;
        } else {
          oldCoordsRef.current.forEach((item) => {
            pixelsColorsRef.current.forEach((item2) => {
              if (item[0] === item2[2] && item[1] === item2[3]) {
                item2[1] = 1;
                item2[0] = blockScreenRef.current!.color;
              }
            });
          });
        }
      }
    } else if (direct === -1) {
      oldCoordsRef.current.forEach((coord) => {
        if (coord[0] - 1 < -5) flag = false;
        else newCoords.push([coord[0] - 1, coord[1]]);
      });
      if (flag) {
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            item[1] = 0;
            item[0] = "#fff";
          }
        });

        newCoords.forEach((item) => {
          if (
            pixelsColorsRef.current[(-item[1] + 10) * 11 + (item[0] + 5)][1] ===
            2
          ) {
            flag = false;
          }
        });
        if (flag) {
          newCoords.forEach((item) => {
            pixelsColorsRef.current.forEach((item2) => {
              if (item[0] === item2[2] && item[1] === item2[3]) {
                item2[1] = 1;
                item2[0] = blockScreenRef.current!.color;
              }
            });
          });
          blockScreenRef.current!.x--;
        } else {
          oldCoordsRef.current.forEach((item) => {
            pixelsColorsRef.current.forEach((item2) => {
              if (item[0] === item2[2] && item[1] === item2[3]) {
                item2[1] = 1;
                item2[0] = blockScreenRef.current!.color;
              }
            });
          });
        }
      }
    }

    //console.log(`Kształt2: ${blockScreenRef.current!.shape}`);
  }

  function rotateBlock() {
    //console.log("Rotate block");

    const newShapeCoords: [number, number][] = [];
    blockScreenRef.current?.shape.forEach((item) => {
      newShapeCoords.push([item[1], -item[0]]);
    });

    setOldCoords([]);

    let [minX, maxX, minY] = [0, 0, 0];
    const old: [number, number][] = [];
    let flag = true;

    newShapeCoords.forEach((item) => {
      if (item[0] + blockScreenRef.current!.x > maxX)
        maxX = item[0] + blockScreenRef.current!.x;
      if (item[0] + blockScreenRef.current!.x < minX)
        minX = item[0] + blockScreenRef.current!.x;
      if (item[1] + blockScreenRef.current!.y < minY)
        minY = item[1] + blockScreenRef.current!.y;
    });

    const moveX1 = Math.max(-5 - minX, 0);
    const moveX2 = Math.max(maxX - 5, 0);
    const moveY = Math.max(-10 - minY, 0);

    //console.log(`Shape kordy ${newShapeCoords}`);

    newShapeCoords.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x + moveX1 - moveX2,
        item[1] + blockScreenRef.current!.y,
      ]);
    });

    //console.log(`Move ${moveX1} ${moveX2}`);

    old.forEach((item) => {
      pixelsColorsRef.current.forEach((item2) => {
        if (
          item[0] === item2[2] &&
          item[1] === item2[3] &&
          item2[0] !== "#fff" &&
          item2[1] === 2
        ) {
          flag = false;
        }
      });
    });
    //console.log(`Flag1: ${flag}`);
    if (flag) {
      blockScreenRef.current!.x += moveX1 - moveX2;

      if (moveY === 0) {
        setOldCoords(old);
        oldCoordsRef.current = old;
      }

      //console.log(
      //  `Przesunięcie: ${blockScreenRef.current!.y} ${
      //    oldCoordsRef.current.length
      //  }`
      //);

      if (flag && moveY === 0) {
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        oldCoordsRef.current.forEach((item) => {
          pixelsColorsRef.current.forEach((item2) => {
            if (item[0] === item2[2] && item[1] === item2[3]) {
              item2[1] = 1;
              item2[0] = blockScreenRef.current!.color;
            }
          });
        });
      }
      if (moveY == 0) {
        blockScreenRef.current!.shape = newShapeCoords;
      }
    }
  }

  const [test, setTest] = useState(0);
  const testRef = useRef(test);

  useEffect(() => {
    console.log(`Początkowo: ${test}`);
  }, []);

  useEffect(() => {
    if (testRef.current === 0) {
      setTest((prevTest) => prevTest + 1);
      setPixelColors(setUpPixelColors());
      return () => {
        setShape(startGame());
        const play = setInterval(() => {
          if (gameOverRef.current === 0) {
            moveBlock(0);
          } else if (gameOverRef.current === 1) {
            playGameOver();
            window.removeEventListener;
            gameOverRef.current = 2;
          }
        }, 400);
      };
    }
  }, []);

  return (
    <ul>
      {pixelsColorsRef.current.map((item) => (
        <Pixel
          className="pixel"
          color={item[0]}
          x={item[2]}
          y={item[3]}
        ></Pixel>
      ))}
    </ul>
  );
};

export default Tetris;
