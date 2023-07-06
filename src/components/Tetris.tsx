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
  y: number = 10;
  shape: number[][] = [];
  shapeId: number = 0;
  constructor(color: string, x: number, shape: number[][], shapeId: number) {
    this.color = color;
    this.x = x;
    this.shape = shape;
    this.shapeId = shapeId;
  }
}

/*const pixelsColors: [string, number, number, number][] = [];

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    pixelsColors.push(["#fff", 0, -5 + j, -10 + i]);
  }
}*/

/*let board: React.ReactNode[][] = [];
for (let i = 0; i < height; i++) {
  board.push([]);
  for (let j = 0; j < width; j++) {
    board[i].push(
      <Pixel className="pixel" color="#fff" x={-5 + j} y={10 - i}></Pixel>
    );
  }
}

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

function moveToTheWorldSpace(block: Block) {
  const worldSpacePoints: number[][] = [];
  block.shape.forEach((point) =>
    worldSpacePoints.push([block.x + point[0], block.y + point[1]])
  );
  return worldSpacePoints;
}

function createBlock() {
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
  const shape = shapes[drawShape];
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
  return new Block(color, x, shape, drawShape);
}

function moveBlock(block: Block, direct: number) {
  const oldCoord: number[][] = [];
  block.shape.forEach((item) => {
    oldCoord.push([item[0] + block.x, item[1] + block.y]);
  });
  const newCoord: number[][] = [];
  let flag = true;
  if (direct === -1) {
    block.shape.forEach((coord) => {
      if (coord[0] - 1 < -5 && !flag) flag = true;
      else newCoord.push([coord[0] - 1, coord[1]]);
    });
  } else if (direct === 1) {
    block.shape.forEach((coord) => {
      if (coord[0] + 1 > 5 && !flag) flag = true;
      else newCoord.push([coord[0] + 1, coord[1]]);
    });
  } else if (direct === 0) {
    /////////////////////////////

    console.log("direct:0.1");
    oldCoord.forEach((coord) => {
      console.log(`${block.color} Color ${coord[0]} ${coord[1]} Values`);

      if (coord[1] - 1 < -10) flag = false;
      else if (coord[1] <= 10) newCoord.push([coord[0], coord[1] - 1]);

      console.log(`${coord[0]} | ${coord[1]} <${coord[1] + 1}>`);
    });
    if (flag) {
      newCoord.forEach((item) => {
        console.log(`direct:0.2 ${(item[1] + 10) * 11 + (item[0] + 5)}`);
        if (pixelsColors[(item[1] + 10) * 11 + (item[0] + 5)][1] === 2) {
          flag = false;
        }
      });

      if (flag) {
        console.log(`Pixel ${pixelsColors[3][1]}`);

        pixelsColors.forEach((item) => {
          if (item[1] === 1) {
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        block.shape = newCoord;
        newCoord.forEach((item) => {
          console.log("direct:0.4");
          pixelsColors.forEach((item2) => {
            if (item[0] === item2[2] && item[1] === item2[3]) {
              item2[1] = 1;
              item2[0] = block.color;
            }
          });
        });
        block.y--;
        console.log(`Y: ${block.y} | ${pixelsColors}`);
      }
    }

    //////////////////
  }
  if (!flag && direct !== 0) {
    newCoord.forEach((coord) => {
      const pixel1: React.ReactNode = board[coord[0] + 5][coord[1] + 10];
      if (React.isValidElement(pixel1)) {
        const pix = pixel1.props;
        const color = pix.color;
        if (color !== "#fff") flag = false;
      }
    });
    if (flag) {
      pixelsColors.forEach((item) => {
        if (item[1] === 1) {
          item[1] = 0;
        }
      });
      block.shape = newCoord;
      newCoord.forEach((item) =>
        pixelsColors.forEach((item2) => {
          if (item[0] === item2[2] && item[1] === item2[3]) {
            item2[1] = 1;
            item2[0] = block.color;
          }
        })
      );
    }
  }
}

function rotateBlock(block: Block) {
  const newCoord: number[][] = [];
  block.shape.forEach((coord) => newCoord.push([coord[1], -coord[0]]));
  let flag = true;
  let [minX, maxX, maxY] = [0, 0, 0];
  newCoord.forEach((coord) => {
    const pixel1: React.ReactNode = board[coord[0] + 5][coord[1] + 10];
    if (React.isValidElement(pixel1)) {
      const pix = pixel1.props;
      const [x, y] = [pix.x, pix.y];
      x < -5 ? (minX = x) : x > 5 ? (maxX = x) : y > 10 ? (maxY = y) : 0;
    }
  });
  if (minX < -5) {
    newCoord.forEach((coord) => (coord[0] += -5 - minX));
  } else if (maxX > 5) {
    newCoord.forEach((coord) => (coord[0] -= maxX - 5));
  } else if (maxY > 10) {
    newCoord.forEach((coord) => (coord[1] -= maxY - 10));
  }
  newCoord.forEach((coord) => {
    const pixel1: React.ReactNode = board[coord[0] + 5][coord[1] + 10];
    if (React.isValidElement(pixel1)) {
      const pix = pixel1.props;
      const color = pix.color;
      if (color !== "#fff") flag = false;
    }
  });
  if (flag) {
    pixelsColors.forEach((item) => {
      if (item[1] === 1) {
        item[1] = 0;
      }
    });
    block.shape = newCoord;
    newCoord.forEach((item) =>
      pixelsColors.forEach((item2) => {
        if (item[0] === item2[2] && item[1] === item2[3]) {
          item2[1] = 1;
          item2[0] = block.color;
        }
      })
    );
  }
}

function startGame() {
  let blockScreen: Block;

  blockScreen = createBlock();
  block = 1;

  //console.log(blockScreen.shape);
  document.addEventListener("keypress", (event) => {
    if (event.key === "ArrowLeft") {
      moveBlock(blockScreen, -1);
    } else if (event.key === "ArrowRight") {
      moveBlock(blockScreen, 1);
    } else if (event.key === "Space") {
      rotateBlock(blockScreen);
    }
  });
  const interval = setInterval(() => {
    moveBlock(blockScreen, 0);
  }, 750);
}

let groups: React.ReactNode[] = [];*/

///////////////

const Tetris = ({ className }: Props) => {
  const [pixelsColors, setPixelColors] = useState<
    [string, number, number, number][]
  >([]);
  const pixelsColorsRef = useRef(pixelsColors);
  const [oldCoords, setOldCoords] = useState<[number, number][]>([]);
  const oldCoordsRef = useRef<[number, number][]>([]);
  const [block, setBlock] = useState(0);
  const blockScreenRef = useRef<Block | null>(null);
  const [shape, setShape] = useState(createBlock());

  function setUpPixelColors() {
    setPixelColors((oldPixelsColors) => {
      const newPixelsColors: [string, number, number, number][] = [];
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 11; j++) {
          newPixelsColors.push(["#fff", 0, -5 + j, 10 - i]);
        }
      }
      pixelsColorsRef.current = newPixelsColors;
      return [...newPixelsColors];
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
    setBlock(1);

    /*document.addEventListener("keypress", (event) => {
      if (event.key === "ArrowLeft") {
        moveBlock(-1);
      } else if (event.key === "ArrowRight") {
        moveBlock(1);
      } else if (event.key === "Space") {
        //rotateBlock(blockScreen);
      }
    });*/
    blockScreenRef.current = blockScreen;

    return blockScreen;
  }

  function moveBlock(direct: number) {
    setOldCoords([]);
    //console.log(`Kształt1: ${blockScreenRef.current?.shape}`);
    //console.log(
    //  `old coord1: ${oldCoords.length} ${
    //    blockScreenRef.current?.shape.length
    //  } Shape: ${blockScreenRef.current!.x}, ${blockScreenRef.current!.y}`
    //);

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

    console.log(
      `Przesunięcie: ${blockScreenRef.current!.y} ${
        oldCoordsRef.current.length
      }`
    );
    let flag = true;
    const newCoords: number[][] = [];
    if (direct === 0) {
      //console.log("Przesunięcie 0");
      oldCoordsRef.current.forEach((coord) => {
        //console.log(`Przesunięcie 01: ${coord[0]} ${coord[1]}`);
        if (coord[1] - 1 < -10) flag = false;
        else if (coord[1] <= 10) newCoords.push([coord[0], coord[1] - 1]);
      });
      //console.log(`Przesunięcie 02: ${newCoords.length} ${flag}`);
      if (flag) {
        //console.log(`Przesunięcie 1 ;; ${newCoords.length}`);
        newCoords.forEach((item) => {
          //console.log(
          //  `New: ${item[0]}, ${item[1]} ; ${
          //  (item[1] + 10) * 11 + (item[0] + 5)
          //  } Wartość: ${
          //    pixelsColorsRef.current[(item[1] + 10) * 11 + (item[0] + 5)]
          //  } ;; `
          //);
          if (
            pixelsColorsRef.current[(item[1] + 10) * 11 + (item[0] + 5)][1] ===
            2
          ) {
            flag = false;
          }
        });
        //console.log(`Przesunięcie 1 // ${newCoords.length}`);
      }
      if (flag) {
        //console.log("Przesunięcie 2");
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            //console.log("Równe 1");
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        //console.log(`Koordy: ${newCoords.length}`);
        newCoords.forEach((item) => {
          //console.log("Zmiana na 1 (0)");
          pixelsColorsRef.current.forEach((item2) => {
            //console.log("Zmiana na 1 (1)");
            if (item[0] === item2[2] && item[1] === item2[3]) {
              //console.log("Zmiana na 1 (2)");
              item2[1] = 1;
              item2[0] = blockScreenRef.current!.color;
            }
          });
        });
        blockScreenRef.current!.y--;
      }
    }
    //console.log(`Kształt2: ${blockScreenRef.current!.shape}`);
  }

  useEffect(() => {
    setUpPixelColors();
    console.log(`PixelColors: ${pixelsColors.length}`);
    setShape(startGame());
    console.log(shape.shape);
    const play = setInterval(() => moveBlock(0), 1000);
  }, []);

  return (
    <ul>
      {pixelsColors.map((item) => (
        <Pixel
          className="pixel"
          color={item[0]}
          x={item[2]}
          y={item[3]}
        ></Pixel>
      ))}
    </ul>
  );
  ///////////

  /*const [groups, setGroups] = useState<React.ReactNode[]>([]);

  const reset = () => {
    board = [];
    const newGroups: React.ReactNode[] = [];
    for (let i = 0; i < height; i++) {
      const row: React.ReactNode[] = [];
      for (let j = 0; j < width; j++) {
        row.push(
          <Pixel
            className="pixel"
            color={pixelsColors[i * 11 + j][0]}
            x={-5 + j}
            y={10 - i}
          ></Pixel>
        );
      }
      board.push(row);
      newGroups.push(row);
    }
    setGroups(newGroups);
    console.log(board);
  };

  React.useEffect(() => {
    startGame();
    reset();
  }, []);

  return <ul>{groups}</ul>;*/

  //////////
};

export default Tetris;
