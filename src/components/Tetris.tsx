import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Pixel from "./Pixel";

const width = 11;
const height = 21;
let block = 0;

interface Props {
  className: string;
  start: boolean;
  onScoreChange: (score: number) => void;
  onShapeChange: (shape: number) => void;
}

class Block {
  color: string = "#fff";
  x: number = 0;
  y: number = 11;
  shape: number[][] = [];
  shapeId: number = 0;
  upBlocks: Record<number, number> = {};
  bottomBlocks: Record<number, number> = {};
  constructor(color: string, x: number, shape: number[][], shapeId: number) {
    this.color = color;
    this.x = x;
    this.shape = shape;
    this.shapeId = shapeId;
  }
}

const Tetris = ({ className, start, onScoreChange, onShapeChange }: Props) => {
  const [pixelsColors, setPixelColors] = useState<
    [string, number, number, number][]
  >([]);
  const pixelsColorsRef = useRef(pixelsColors);
  const [oldCoords, setOldCoords] = useState<[number, number][]>([]);
  const oldCoordsRef = useRef<[number, number][]>([]);
  const blockScreenRef = useRef<Block | null>(null);

  const [shape, setShape] = useState(createBlock());
  const [nextShape, setNextShape] = useState(createBlock());
  const nextBlockScreenRef = useRef<Block>(nextShape);
  const [gameOver, setGameOver] = useState(0);
  const gameOverRef = useRef(gameOver);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);
  const [combo, setCombo] = useState(0);
  const comboRef = useRef(combo);
  const [period, setPeriod] = useState(0);
  const [minY, setMinY] = useState<number[][]>([
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
    [-11],
  ]);
  const minYRef = useRef(minY);

  function setUpPixelColors() {
    const newPixelsColors: [string, number, number, number][] = [];
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 11; j++) {
        newPixelsColors.push(["#fff", 0, -5 + j, 10 - i]);
      }
    }
    pixelsColorsRef.current = newPixelsColors;
  }

  function playGameOver() {
    let i = 230;
    let tribe = 0;
    const over = setInterval(() => {
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
    const old: [number, number][] = [];
    blockScreenRef.current?.shape.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x,
        item[1] + blockScreenRef.current!.y,
      ]);
    });
    old.forEach((item) => {
      pixelsColorsRef.current.forEach((item2) => {
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
      color = "#00f";
    } else if (drawColor === 1) {
      color = "#0f0";
    } else if (drawColor === 2) {
      color = "#f00";
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

  function setUpBlock(t: number) {
    function upDateBlock(key: number) {
      const oldKey = t === 0 ? key + blockScreenRef.current!.x + 5 : key;

      let tribe = 0;
      const upBlocks: number[] = [];
      for (let i = oldKey; i < 231; i += 11) {
        if (tribe === 0 && pixelsColorsRef.current[i][0] !== "#fff") {
          tribe = 1;
          upBlocks.push(Math.ceil(-i / 11) + 10);
        } else if (tribe === 1 && pixelsColorsRef.current[i][0] === "#fff") {
          tribe = 0;
        }
      }
      if (tribe === 0) upBlocks.push(-11);
      minYRef.current[oldKey] = upBlocks;
    }

    if (t === 0) {
      for (const key in blockScreenRef.current?.upBlocks) {
        upDateBlock(parseInt(key));
      }
    } else if (t === 1) {
      for (let i = 0; i < 11; i++) {
        upDateBlock(i);
      }
    }
  }

  function pushBlock() {
    minYRef.current.forEach((item) => console.log(item));
    let minDiff = 22;
    const oldCoords: [number, number][] = [];
    blockScreenRef.current!.shape.forEach((item) => {
      oldCoords.push([
        item[0] + blockScreenRef.current!.x,
        item[1] + blockScreenRef.current!.y,
      ]);
    });
    for (const key in blockScreenRef.current!.bottomBlocks) {
      const oldKey = parseInt(key) + blockScreenRef.current!.x + 5;
      const oldY =
        blockScreenRef.current!.bottomBlocks[key] + blockScreenRef.current!.y;
      const upBlock = minYRef.current[oldKey]
        .filter((item) => item <= oldY)
        .sort((a, b) => a - b)
        .reverse()[0];

      minDiff = oldY - upBlock < minDiff ? oldY - upBlock : minDiff;
    }
    const newCoords: [number, number][] = oldCoords.map((item) => [
      item[0],
      item[1] - minDiff + 1,
    ]);
    pixelsColorsRef.current.forEach((item, index) => {
      if (item[1] === 1) {
        pixelsColorsRef.current[index][1] = 0;
        pixelsColorsRef.current[index][0] = "#fff";
      }
    });
    pixelsColorsRef.current.forEach((item, index) => {
      newCoords.forEach((item2) => {
        item[2] === item2[0] && item[3] === item2[1]
          ? (pixelsColorsRef.current[index] = [
              blockScreenRef.current!.color,
              2,
              pixelsColorsRef.current[index][2],
              pixelsColorsRef.current[index][3],
            ])
          : pixelsColorsRef.current[index];
      });
    });
    blockScreenRef.current!.y -= minDiff - 1;
    setUpBlock(0);
    checkLine();
    blockScreenRef.current = nextBlockScreenRef.current;
    setShape(blockScreenRef.current);
    nextBlockScreenRef.current = createBlock();
    console.log(nextBlockScreenRef.current.color);
  }

  const event = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.code === "ArrowLeft") {
      moveBlock(-1);
    } else if (event.code === "ArrowRight") {
      moveBlock(1);
    } else if (event.code === "Space") {
      rotateBlock();
    } else if (event.code === "ArrowDown") {
      setPeriod(100);
    } else if (event.code === "Enter") {
      pushBlock();
    }
  };

  const upEvent = () => setPeriod(400);

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

    window.addEventListener("keydown", event);

    window.addEventListener("keyup", upEvent);

    blockScreenRef.current = blockScreen;

    return blockScreen;
  }

  function checkLine() {
    const colors: number[] = [];
    let [color, line, flag] = ["", 10, true];
    pixelsColorsRef.current.forEach((item, index) => {
      if (item[3] !== line) {
        line = item[3];
        color = "";
        flag = true;
      }
      if (item[0] === "#fff" || (color !== "" && item[0] !== color)) {
        flag = false;
      }
      color = item[0];
      if (index % 11 === 10 && flag) {
        if (color != "" && flag === true) {
          colors.push(line);
        }
      }
    });

    colors.forEach((item) => {
      pixelsColorsRef.current.splice((-item + 10) * 11, 11);
      pixelsColorsRef.current.forEach((item2, index) => {
        if (item2[3] > item) item2[3]--;
      });
      for (let i = 0; i < 11; i++) {
        pixelsColorsRef.current.unshift(["#fff", 0, 5 - i, 10]);
      }
      setUpBlock(1);
    });

    colors.length === 0 ? (comboRef.current = 0) : comboRef.current;
    scoreRef.current +=
      25 * (colors.length ** 2 + 3 * colors.length) + 50 * comboRef.current;
    comboRef.current += colors.length;

    console.log("Wywołano setPixelColors");

    setPixelColors([...pixelsColorsRef.current]);
  }

  function moveBlock(direct: number) {
    setOldCoords([]);

    const old: [number, number][] = [];

    blockScreenRef.current?.shape.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x,
        item[1] + blockScreenRef.current!.y,
      ]);
    });
    setOldCoords(old);
    oldCoordsRef.current = old;

    let flag = true;
    const newCoords: number[][] = [];
    if (direct === 0) {
      oldCoordsRef.current.forEach((coord) => {
        if (coord[1] - 1 < -10) flag = false;
        else if (coord[1] <= 11) newCoords.push([coord[0], coord[1] - 1]);
      });

      if (flag) {
        if (flag) {
          pixelsColorsRef.current.forEach((item) => {
            if (item[1] === 1) {
              item[1] = 0;
              item[0] = "#fff";
            }
          });
          newCoords.forEach((item) => {
            pixelsColorsRef.current.forEach((item2) => {
              if (
                item[0] === item2[2] &&
                item[1] === item2[3] &&
                item2[1] === 2
              ) {
                flag = false;
              }
            });
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
          } else {
            checkOver();
            oldCoordsRef.current.forEach((item) => {
              pixelsColorsRef.current.forEach((item2) => {
                if (item[0] === item2[2] && item[1] === item2[3]) {
                  item2[1] = 2;
                  item2[0] = blockScreenRef.current!.color;
                }
              });
            });

            setUpBlock(0);
            checkLine();
            blockScreenRef.current = nextBlockScreenRef.current;
            setShape(blockScreenRef.current);
            nextBlockScreenRef.current = createBlock();
            console.log(nextBlockScreenRef.current.color);
          }
          if (flag) {
            blockScreenRef.current!.y--;
          } else {
            flag = true;
          }
        }
      } else {
        setUpBlock(0);

        pixelsColorsRef.current.map((item) => {
          if (item[1] === 1) {
            item[1] = 2;
          }
        });
        checkLine();
        blockScreenRef.current = nextBlockScreenRef.current;
        setShape(blockScreenRef.current);
        nextBlockScreenRef.current = createBlock();
        console.log(nextBlockScreenRef.current.color);
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
          if (item[1] < 11) {
            if (
              pixelsColorsRef.current[
                (-item[1] + 10) * 11 + (item[0] + 5)
              ][1] === 2
            ) {
              flag = false;
            }
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
          if (item[1] < 11) {
            if (
              pixelsColorsRef.current[
                (-item[1] + 10) * 11 + (item[0] + 5)
              ][1] === 2
            ) {
              flag = false;
            }
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
  }

  function rotateBlock() {
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

    newShapeCoords.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x + moveX1 - moveX2,
        item[1] + blockScreenRef.current!.y,
      ]);
    });

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
    if (flag) {
      blockScreenRef.current!.x += moveX1 - moveX2;

      if (moveY === 0) {
        setOldCoords(old);
        oldCoordsRef.current = old;
      }
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
    if (nextBlockScreenRef.current !== null) {
      const color = () => {
        switch (nextBlockScreenRef.current!.color) {
          case "#00f":
            return 0;
          case "#0f0":
            return 1;
          case "#f00":
            return 2;
          case "#ff0":
            return 3;
          default:
            return -1;
        }
      };
      onShapeChange(nextBlockScreenRef.current!.shapeId * 4 + color());
    }
  }, [nextBlockScreenRef.current]);

  useEffect(() => {
    onScoreChange(scoreRef.current);
  }, [scoreRef.current]);

  useEffect(() => {
    if (blockScreenRef.current?.shape) {
      const upBlock: Record<number, number> =
        blockScreenRef.current!.shape.reduce(
          (accumulator: Record<number, number>, [x, y], index) => {
            if (!(x in accumulator) || y > accumulator[x]) {
              accumulator[x] = y;
            }
            return accumulator;
          },
          {}
        );

      blockScreenRef.current!.upBlocks = upBlock;

      const bottomBlocks: Record<number, number> =
        blockScreenRef.current!.shape.reduce(
          (accumulator: Record<number, number>, [x, y], index) => {
            if (!(x in accumulator) || y < accumulator[x]) {
              accumulator[x] = y;
            }
            return accumulator;
          },
          {}
        );

      blockScreenRef.current!.bottomBlocks = bottomBlocks;
    }
  }, [blockScreenRef.current?.shape]);

  useEffect(() => {
    console.log("Play Start");
    window.removeEventListener;
    const play = setInterval(() => {
      if (gameOverRef.current === 0) {
        moveBlock(0);
      } else if (gameOverRef.current === 1) {
        playGameOver();
        window.removeEventListener;
        gameOverRef.current = 2;
      }
    }, period);
    return () => {
      console.log("Play Return");
      clearInterval(play);
    };
  }, [period]);

  useEffect(() => {
    console.log(`Początkowo: ${test}`);
  }, [test]);

  useEffect(() => {
    console.log(`Start Game ${test} Start: ${start}`);
    if (test === 0) {
      console.log(`Test równe ${test}`);
      setTest((prevTest) => prevTest + 1);
      setUpPixelColors();
      return () => {
        console.log(`Return ${testRef.current}`);
        setShape(startGame());
        setPeriod(400);
      };
    } else {
      setUpPixelColors();
      minYRef.current = minYRef.current.map((item) => (item = [-11]));
      minYRef.current.forEach((item) => console.log(`Poprawka: ${item}`));
      blockScreenRef.current = createBlock();
      nextBlockScreenRef.current = createBlock();
      scoreRef.current = 0;
    }
  }, [start]);

  return (
    <div className="tetris">
      {pixelsColorsRef.current.map((item) => (
        <Pixel
          className="pixel"
          color={item[0]}
          x={item[2]}
          y={item[3]}
        ></Pixel>
      ))}
    </div>
  );
};

export default Tetris;
